const nodemailer = require('nodemailer');
const l = require('../common/logger');

const otpTemplate = require('../utils/email/otpTemplate');
const emailId = process.env.EMAILID;
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD,
  },
});

class MailerService {
  /**
   * To send password reset email
   * @param {string} mail - mailId of USER
   * @param {integer} otp - otp
   */
  async sendPasswordResetEmail(userEmailId, userName, otp) {
    try {
      const mailOptions = {
        from: process.env.GMAIL_ID,
        to: userEmailId,
        subject: `OTP to reset password`,
        text: otpTemplate(userName, otp),
      };
      this.triggerMail(mailOptions);
    } catch (err) {
      l.error('[SEND PASSWORD RESET EMAIL]', userEmailId, userName, otp);
      throw err;
    }
  }
  async contactUs(name, phone, email, message) {
    try {
      const mailOptions = {
        from: process.env.GMAIL_ID,
        to: process.env.GMAIL_ID,
        subject: `Contact Us`,
        text: `
        Name: ${name},
        Phone: ${phone},
        Email: ${email},
        Message: ${message}`,
      };
      this.triggerMail(mailOptions);
    } catch (err) {
      l.error('[SEND CONTACT US]', userEmailId, userName, otp);
      throw err;
    }
  }
  async triggerMail(mailOptions) {
    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      l.error('[SENDING MAIL]');
      throw err;
    }
  }
}
module.exports = new MailerService();
