const { searchImages } = require('../services/unsplashService');
const { savePhoto, addTags, searchByTag } = require('../services/photoService');
const searchPhotos = async (req, res) => {
  const { query } = req.query;

  // Validate query parameter
  if (!query) {
    return res.status(400).json({ message: 'Search term is required.' });
  }

  try {
    const photos = await searchImages(query);

    if (photos.length === 0) {
      return res.status(404).json({ message: 'No images found for the given query.' });
    }

    return res.json({ photos });
  } catch (error) {
    console.error('Error in searchPhotos:', error.message);
    return res.status(500).json({ message: 'An error occurred while searching for photos.' });
  }
};

const createPhoto = async (req, res) => {
  try {
    const { imageUrl, description, altDescription, tags, userId } = req.body;

    // Ensure required fields are present
    if (!imageUrl || !userId) {
      return res.status(400).json({ message: 'Image URL and userId are required' });
    }

    // Save the photo
    await savePhoto({ imageUrl, description, altDescription, tags, userId });

    return res.status(201).json({ message: 'Photo saved successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const addTagsToPhoto = async (req, res) => {
  const { photoId } = req.params;
  const { tags: newTags } = req.body;

  try {
    if (!Array.isArray(newTags)) {
      return res.status(400).json({ message: 'Tags must be an array.' });
    }

    newTags.forEach((tag) => {
      if (typeof tag !== 'string' || tag.trim() === '') {
        throw new Error('Tags must be non-empty strings.');
      }
    });

    const result = await addTags(photoId, newTags);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const searchPhotosByTag = async (req, res) => {
  const { tags, sort = 'ASC', userId } = req.query;

  try {
    // Validate the input
    if (!tags) {
      return res.status(400).json({ message: 'Tag is required.' });
    }

    if (!['ASC', 'DESC'].includes(sort.toUpperCase())) {
      return res.status(400).json({ message: 'Sort must be either ASC or DESC.' });
    }

    // Call the service to fetch photos
    const photos = await searchByTag({ tag: tags, sort, userId });

    res.json({ photos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { searchPhotos, createPhoto, addTagsToPhoto, searchPhotosByTag};
