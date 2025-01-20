const { createNewUser } = require('../controllers/userController');
const { doesUserExist, addUser } = require('../services/userService');
const { validateEmail, validateRequiredFields } = require('../utils/validators');

jest.mock('../services/userService');
jest.mock('../utils/validators');

describe('User Controller', () => {
  describe('createNewUser', () => {
    it('should return 201 and the new user on successful creation', async () => {
      const req = { body: { username: 'John', email: 'john@example.com' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      doesUserExist.mockResolvedValue(false);
      addUser.mockResolvedValue({ id: 1, username: 'John', email: 'john@example.com' });

      await createNewUser(req, res);

      expect(validateRequiredFields).toHaveBeenCalledWith({ username: 'John', email: 'john@example.com' });
      expect(validateEmail).toHaveBeenCalledWith('john@example.com');
      expect(doesUserExist).toHaveBeenCalledWith('john@example.com');
      expect(addUser).toHaveBeenCalledWith({ username: 'John', email: 'john@example.com' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User created successfully',
        user: { id: 1, username: 'John', email: 'john@example.com' },
      });
    });

    it('should return 400 if the email already exists', async () => {
      const req = { body: { username: 'John', email: 'john@example.com' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      doesUserExist.mockResolvedValue(true);

      await createNewUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email already exists' });
    });
  });
});
