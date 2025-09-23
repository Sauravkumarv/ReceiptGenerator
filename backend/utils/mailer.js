// backend/utils/mailer.js
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Simple regex to check email format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const sendMail = async (to, subject, html) => {
  if (!to || !isValidEmail(to)) {
    console.warn("sendMail skipped: Invalid or missing recipient");
    return;
  }

  try {
    console.log(`Sending email to: ${to}`);
    await transporter.sendMail({
      from: `"Support Team" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to} successfully`);
  } catch (error) {
    console.error("Email error:", error);
  }
};

 module.exports = { sendMail, isValidEmail };