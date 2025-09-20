// models/SupportTicket.js
const mongoose = require("mongoose");

const SupportTicketSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  category: {
    type: String,
    enum: ["technical", "feature", "billing", "general", "bug"]
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "medium"
  },
  message: String,
  status: {
    type: String,
    enum: ["open", "in-progress", "resolved", "closed"],
    default: "open"
  }
}, { timestamps: true }); // 👈 auto adds createdAt & updatedAt

module.exports = mongoose.model("SupportTicket", SupportTicketSchema);
