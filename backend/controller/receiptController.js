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



// Get all receipts for a specific user
const getUserReceipts = async (req, res) => {
  try {
    const userId = req.params.userId; // user ID from request params

    const receipts = await Receipt.find({ userId }).sort({ createdAt: -1 }); // latest first

    if (!receipts || receipts.length === 0) {
      return res.status(404).json({ message: "No receipts found for this user" });
    }
console.log(receipts)
    // Return only necessary fields
    const data = receipts.map(r => ({
      id: r._id,
      filename: r.filename,
      originalName: r.originalName,
      fileUrl: r.fileUrl,
      receiptNumber: r.receiptNumber,
      storeName: r.storeName,
      customerName: r.customerName,
      subtotal: r.subtotal,
      tax: r.tax,
      total: r.total,
      createdAt: r.createdAt
    }));

    res.json({ receipts: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { uploadReceipt, checkReceipt,getUserReceipts }