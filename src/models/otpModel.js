class OTPModel {
    constructor() {
      this.otpStore = new Map();
    }
  
    storeOTP(phoneNumber, otp, expiryTime) {
      this.otpStore.set(phoneNumber, { otp, expiryTime });
    }
  
    getOTP(phoneNumber) {
      return this.otpStore.get(phoneNumber);
    }
  
    deleteOTP(phoneNumber) {
      this.otpStore.delete(phoneNumber);
    }
  }
  
  module.exports = new OTPModel();