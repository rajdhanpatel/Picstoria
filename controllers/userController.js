const { doesUserExist, addUser } = require('../services/userService');
const { validateEmail, validateRequiredFields } = require('../utils/validators');

const createNewUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Validate the request body
    validateRequiredFields({ username, email });
    validateEmail(email);

    // Check if the user already exists
    const userExists = await doesUserExist(email);
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Add the new user to the database
    const newUser = await addUser({ username, email });

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createNewUser };
