const jwt = require('jsonwebtoken');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const generateToken = (phoneNumber) => {
  return jwt.sign(
    { phoneNumber }, 
    process.env.OTP_SECRET_KEY, 
    { expiresIn: '1h' }
  );
};

module.exports = {
  generateOTP,
  generateToken
};