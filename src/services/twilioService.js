const twilioClient = require('../config/twilioConfig');

class TwilioService {
  async sendSMS(to, body) {
    return await twilioClient.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    });
  }
}

module.exports = new TwilioService();