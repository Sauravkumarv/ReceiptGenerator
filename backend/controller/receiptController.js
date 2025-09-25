const cloudinary = require('../config/cloudinary');
const Receipt = require('../model/receiptSchema');

const uploadReceipt = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    const { receiptNumber, storeName, customerName, subtotal, tax, total } = req.body;

    const existing = await Receipt.findOne({ receiptNumber, userId: req.user.id });
    if (existing) return res.json({
      success: false,
      message: "Receipt already exists",
      receiptId: existing._id,
      fileUrl: existing.fileUrl
    });

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "raw", folder: "receipts", public_id: `receipt_${receiptNumber}_${Date.now()}` },
        (error, result) => error ? reject(error) : resolve(result)
      ).end(req.file.buffer);
    });

    const newReceipt = await Receipt.create({
      filename: uploadResult.public_id,
      originalName: req.file.originalname,
      receiptNumber,
      userId: req.user.id,
      fileUrl: uploadResult.secure_url,
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

const getUserReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find({ userId: req.user.id }).sort({ createdAt: -1 });
    if (!receipts || receipts.length === 0) return res.status(404).json({ message: "No receipts found" });
    res.json({ receipts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const checkReceipt = async (req, res) => {
  const { receiptNumber } = req.body;
  if (!receiptNumber) return res.status(400).json({ message: "Missing receipt number" });

  const exists = await Receipt.findOne({ receiptNumber, userId: req.user?.id });
  res.json({ exists: !!exists });
};

module.exports = { uploadReceipt, getUserReceipts, checkReceipt };
