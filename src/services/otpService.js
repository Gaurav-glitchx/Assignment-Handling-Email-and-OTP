const OTPModel = require('../models/otpModel');
const twilioService = require('./twilioService');
const { generateOTP } = require('../utils/helpers');

class OTPService {
  async sendOTP(phoneNumber) {
    const otp = generateOTP();
    const expiryTime = Date.now() + (parseInt(process.env.OTP_EXPIRY_MINUTES) * 60 * 1000);
    
    OTPModel.storeOTP(phoneNumber, otp, expiryTime);
    
    const message = await twilioService.sendSMS(
      phoneNumber,
      `Your OTP for login verification is: [${otp}]\nPlease enter this OTP to complete your authentication.\nThis OTP is valid for ${process.env.OTP_EXPIRY_MINUTES} minutes.\n\nBest,\n[Your Company]`
    );
    
    return message.sid;
  }

  async verifyOTP(phoneNumber, otp) {
    const storedOtpData = OTPModel.getOTP(phoneNumber);
    
    if (!storedOtpData) {
      throw new Error('OTP not found or expired');
    }

    if (Date.now() > storedOtpData.expiryTime) {
      OTPModel.deleteOTP(phoneNumber);
      throw new Error('OTP expired');
    }

    if (storedOtpData.otp !== otp) {
      throw new Error('Invalid OTP');
    }

    OTPModel.deleteOTP(phoneNumber);
    return true;
  }
}

module.exports = new OTPService();