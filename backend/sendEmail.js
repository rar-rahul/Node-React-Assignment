// emailService.js
const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  secure:true,
  host: 'smtp.gmail.com', 
  port:465,
  auth: {
    user: 'abc@gmail.com', 
    pass: 'put your gmail app password', 
  },
});

// Function to send email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'abc@gmail.com', //sender gmail Id
    to:to,
    subject:subject,
    html:text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
