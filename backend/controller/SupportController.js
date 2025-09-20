const SupportTicket = require("../model/SupportTicket");
const {sendMail} = require("../utils/mailer");
const dotenv=require('dotenv')
dotenv.config();

// Simple regex check
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const SupportController = async (req, res) => {
  try {
    const { name, email, subject, category, priority, message } = req.body;

    if (!name || !email || !subject || !category || !message) {
      return res.status(400).json({ success: false, msg: "All required fields must be filled" });
    }

    // Only validate email format - REMOVE DNS check for speed
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, msg: "Invalid email format" });
    }

    // Save ticket in DB
    const ticket = await SupportTicket.create({ name, email, subject, category, priority, message });

    // Send response immediately to user
    res.status(201).json({ success: true, msg: "Support request submitted", ticket });

    // Send emails AFTER response (non-blocking)
    setImmediate(async () => {
      try {
        // Send confirmation to user
        await sendMail(
          email,
          "Support Ticket Received",
          `<p>Hi ${name},</p>
           <p>We have received your support request regarding: <b>${subject}</b></p>
           <p>Our team will get back to you soon.</p>
           <p>Ticket ID: ${ticket._id}</p>`
        );

        // Send notification to admin
        const adminEmail = process.env.MAIL_USER;
        if (adminEmail) {
          await sendMail(
            adminEmail,
            `New Support Ticket - ${subject}`,
            `<p>New ticket submitted by ${name} (${email})</p>
             <p>Category: ${category}</p>
             <p>Priority: ${priority}</p>
             <p>Message: ${message}</p>
             <p>Ticket ID: ${ticket._id}</p>`
          );
        }
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Emails failed but user already got success response
      }
    });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

module.exports = { SupportController };