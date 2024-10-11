// emailService.js
const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  secure:true,
  host: 'smtp.gmail.com', 
  port:465,
  auth: {
    user: 'rahulraut430@gmail.com', 
    pass: 'idcslcpfjbftbbcx', 
  },
});

// Function to send email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'rahulraut430@gmail.com',
    to:to,
    subject:subject,
    html:text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
