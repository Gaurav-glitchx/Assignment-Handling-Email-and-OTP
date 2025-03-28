const nodemailer = require('nodemailer');
const path = require('path');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendWelcomeEmail(userName, yourName) {
    const mailOptions = {
      from: `"${yourName || 'Notification System'}" <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      subject: 'Welcome to the Email Notification System',
      text: `Hi ${userName || 'User'},

Welcome to our Notification System!
This is a test email to verify that your setup is working correctly.
Please find the attached Holiday Calendar for reference.

Best Regards,
${yourName || 'Admin'}`,
      html: `<p>Hi ${userName || 'User'},</p>
<p>Welcome to our Notification System!</p>
<p>This is a test email to verify that your setup is working correctly.<br>
Please find the attached <strong>Holiday Calendar</strong> for reference.</p>
<p>Best Regards,<br>
${yourName || 'Admin'}</p>`,
      attachments: [{
        filename: 'Holiday_Calendar.pdf',
        path: path.join(__dirname, '../../assets', 'Holiday_Calendar.pdf'),
      }]
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

module.exports = new EmailService();