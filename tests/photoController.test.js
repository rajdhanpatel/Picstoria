const { searchPhotos, createPhoto } = require('../controllers/photoController');
const { searchImages } = require('../services/unsplashService');
const { savePhoto } = require('../services/photoService');

jest.mock('../services/unsplashService');
jest.mock('../services/photoService');

describe('Photo Controller', () => {
  describe('searchPhotos', () => {
    it('should return 200 and the photos array on successful search', async () => {
      const req = { query: { query: 'nature' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      searchImages.mockResolvedValue([{ imageUrl: 'test.jpg', description: 'test' }]);

      await searchPhotos(req, res);

      expect(searchImages).toHaveBeenCalledWith('nature');
      expect(res.status).not.toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ photos: [{ imageUrl: 'test.jpg', description: 'test' }] });
    });

    it('should return 400 if query is missing', async () => {
      const req = { query: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await searchPhotos(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Search term is required.' });
    });
  });

  describe('createPhoto', () => {
    it('should save photo successfully and return 201', async () => {
      const req = { body: { imageUrl: 'https://images.unsplash.com/photo', userId: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      savePhoto.mockResolvedValue();

      await createPhoto(req, res);

      expect(savePhoto).toHaveBeenCalledWith({
        imageUrl: 'https://images.unsplash.com/photo',
        userId: 1,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Photo saved successfully' });
    });

    it('should return 400 if required fields are missing', async () => {
      const req = { body: { imageUrl: '' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await createPhoto(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Image URL and userId are required' });
    });
  });
});
