const user = require('../models/user');
// Check if a user already exists by email
const doesUserExist = async (email) => {
  const user1 = await user.findOne({ where: { email } });
  return !!user1; // Returns true if user exists
};

// Add a new user to the database
const addUser = async ({ username, email }) => {
  const user1 = await user.create({ username, email });
  return user1; // Returns the created user
};

module.exports = { doesUserExist, addUser };
