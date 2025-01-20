const Photo = require('../models/photo');
const SearchHistory = require('../models/searchHistory');
const {Op} = require('sequelize');
const savePhoto = async (photoData) => {
  // Validations
  const { imageUrl, tags } = photoData;

  if (!imageUrl.startsWith('https://images.unsplash.com/')) {
    throw new Error('Invalid image URL');
  }

  if (tags && (tags.length > 5 || tags.some((tag) => tag.length > 20))) {
    throw new Error(
      'Tags must not exceed 5 items, and each tag must not exceed 20 characters.'
    );
  }

  // Save the photo in the database
  const photo = await Photo.create(photoData);
  return photo;
};

const addTags = async (photoId, newTags) => {
    const photo = await Photo.findByPk(photoId);
  
    if (!photo) {
      throw new Error('Photo not found.');
    }
  
    const combinedTags = [...photo.tags, ...newTags];
  
    if (combinedTags.length > 5) {
      throw new Error('A photo can have a maximum of 5 tags.');
    }
  
    photo.tags = combinedTags;
    await photo.save();
  
    return { message: 'Tags added successfully' };
};

const searchByTag = async ({ tag, sort, userId }) => {
    // Check if the tag exists in the database
    const photos = await Photo.findAll({
      where: {
        tags: {
          [Op.contains]: [tag], // Use PostgreSQL's array contains feature
        },
      },
      order: [['createdAt', sort.toUpperCase()]], // Sorting by dateSaved
    });
  
    if (!photos.length) {
      throw new Error(`No photos found for the tag: ${tag}`);
    }
  
    // Log the search query in the searchHistory model
    if (userId) {
      await SearchHistory.create({
        userId,
        query: tag,
      });
    }
  
    // Structure the response
    return photos.map((photo) => ({
      imageUrl: photo.imageUrl,
      description: photo.description,
      dateSaved: photo.dateSaved,
      tags: photo.tags,
    }));
};

module.exports = { savePhoto, addTags, searchByTag };
