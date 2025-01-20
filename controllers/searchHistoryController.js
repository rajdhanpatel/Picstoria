const SearchHistory = require('../models/searchHistory');

const getSearchHistory = async (req, res) => {
  try {
    const { userId } = req.query;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    // Fetch search history for the user
    const searchHistory = await SearchHistory.findAll({
      where: { userId },
      attributes: ['query', 'createdAt'],
      order: [['createdAt', 'DESC']], // Order by the most recent first
    });

    // Handle empty search history
    if (searchHistory.length === 0) {
      return res.status(404).json({ message: 'No search history found for the given user.' });
    }

    // Format response
    const formattedHistory = searchHistory.map((entry) => ({
      query: entry.query,
      timestamp: entry.createdAt,
    }));

    res.status(200).json({ searchHistory: formattedHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving search history.' });
  }
};

module.exports = { getSearchHistory };
