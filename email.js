const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor() {
    this.to = 'alan.f@msn.com'
  }

  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    //   // Sendgrid
    //   return nodemailer.createTransport({
    //     service: 'SendGrid',
    //     auth: {
    //       user: process.env.REACT_APP_SENDGRID_USERNAME,
    //       pass: process.env.REACT_APP_SENDGRID_PASSWORD,
    //     },
    //   });
    // }

    return nodemailer.createTransport({
      host: process.env.REACT_APP_EMAIL_HOST,
      port: process.env.REACT_APP_sEMAIL_PORT,
      auth: {
        user: process.env.REACT_APP_EMAIL_USERNAME,
        pass: process.env.REACT_APP_EMAIL_PASSWORD,
      },
    });
  }

  // Send the email
  async send(from, message) {

    // 2) Define email options
    const mailOptions = {
      from: from,
      to: this.to,
      message,
    };

    // 3) Create a transport and send mail
    await this.newTransport().sendMail(mailOptions);
  }
};
