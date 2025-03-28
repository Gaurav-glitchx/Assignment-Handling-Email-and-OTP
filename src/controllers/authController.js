const otpService = require('../services/otpService');
const { generateToken } = require('../utils/helpers');

exports.sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const messageSid = await otpService.sendOTP(phoneNumber);
    
    res.status(200).json({ 
      success: true, 
      message: 'OTP sent successfully',
      sid: messageSid
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ 
      error: 'Failed to send OTP',
      details: error.message 
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber || !otp) {
      return res.status(400).json({ error: 'Phone number and OTP are required' });
    }

    await otpService.verifyOTP(phoneNumber, otp);
    const token = generateToken(phoneNumber);

    res.status(200).json({ 
      success: true, 
      message: 'OTP verified successfully',
      token 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};