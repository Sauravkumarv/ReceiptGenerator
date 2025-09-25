const cloudinary = require('../config/cloudinary'); // Add this import
const Receipt = require('../model/receiptSchema');

const uploadReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Save metadata in MongoDB
    const { receiptNumber, storeName, customerName, subtotal, tax, total } = req.body;

    const existing = await Receipt.findOne({ receiptNumber });
    if (existing) return res.json({
      success: false,
      message: "Receipt already exists",
      receiptId: existing._id,
      fileUrl: existing.fileUrl
    });

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "receipts",
          public_id: `receipt_${receiptNumber}_${Date.now()}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    const newReceipt = await Receipt.create({
      filename: uploadResult.public_id,        // Cloudinary public_id
      originalName: req.file.originalname,
      receiptNumber,
      fileUrl: uploadResult.secure_url,        // Cloudinary URL
      storeName,
      customerName,
      subtotal: parseFloat(subtotal) || 0,
      tax: parseFloat(tax) || 0,
      total: parseFloat(total) || 0,
    });

    res.json({
      success: true,
      message: "PDF uploaded to Cloudinary and saved to MongoDB",
      receiptId: newReceipt._id,
      filename: uploadResult.public_id,
      receiptNumber: newReceipt.receiptNumber,
      fileUrl: newReceipt.fileUrl,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const checkReceipt = async (req, res) => {
  const { receiptNumber } = req.body;
  if (!receiptNumber) return res.status(400).json({ message: "Missing receipt number" });

  const exists = await Receipt.findOne({ receiptNumber });
  res.json({ exists: !!exists });
}

module.exports = { uploadReceipt, checkReceipt }