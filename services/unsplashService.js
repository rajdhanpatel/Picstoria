const axios = require('axios');

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!UNSPLASH_ACCESS_KEY) {
  throw new Error('Unsplash API key is missing. Please configure it in the .env file.');
}

const searchImages = async (query) => {
  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
      params: {
        query,
        per_page: 10, // Number of results to fetch per request
      },
    });

    // Extract the necessary data
    const photos = response.data.results.map((photo) => ({
      imageUrl: photo.urls?.regular,
      description: photo.description || 'No description available',
      altDescription: photo.alt_description || 'No alternative description available',
    }));

    return photos;
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error.message);
    throw new Error('Failed to fetch images from Unsplash.');
  }
};

module.exports = { searchImages };
