const emailService = require('../services/emailService');

exports.sendEmail = async (req, res) => {
  try {
    const { userName, yourName } = req.body;
    const info = await emailService.sendWelcomeEmail(userName, yourName);
    
    res.status(200).json({ 
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
};