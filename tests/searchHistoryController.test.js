const { getSearchHistory } = require('../controllers/searchHistoryController');
const { SearchHistory } = require('../models');

jest.mock('../models');

describe('Search History Controller', () => {
  it('should return 200 and search history for a valid user', async () => {
    const req = { query: { userId: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    SearchHistory.findAll.mockResolvedValue([
      { query: 'mountains', createdAt: '2024-01-01T12:00:00Z' },
    ]);

    await getSearchHistory(req, res);

    expect(SearchHistory.findAll).toHaveBeenCalledWith({
      where: { userId: 1 },
      attributes: ['query', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      searchHistory: [{ query: 'mountains', timestamp: '2024-01-01T12:00:00Z' }],
    });
  });

  it('should return 400 if userId is missing', async () => {
    const req = { query: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getSearchHistory(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User ID is required.' });
  });
});
