const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address');
    }
  };
  
  const validateRequiredFields = ({ username, email }) => {
    if (!username || !email) {
      throw new Error('Username and email are required');
    }
  };
  
  module.exports = { validateEmail, validateRequiredFields };
  