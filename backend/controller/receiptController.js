// const multer=require('multer')
// const path=require('path')
// const fs=require('fs')
const Receipt=require('../model/receiptSchema')

 const uploadReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Save metadata in MongoDB
    const { receiptNumber, storeName, billTo, subtotal, tax, total } = req.body;

    const existing=await Receipt.findOne({receiptNumber})
    if(existing) return res.json({
      success: false,
      message: "Receipt already exists",
      receiptId: existing._id,
      fileUrl: existing.fileUrl
    });

    const newReceipt = await Receipt.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      receiptNumber,
      storeName,
      customerName: billTo?.name || "",
      subtotal,
      tax,
      total,
    });

    res.json({
      success: true,
      message: "PDF uploaded and saved to MongoDB",
      receiptId: newReceipt._id,
      filename: req.file.filename,
      receiptNumber:newReceipt.receiptNumber
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const checkReceipt=async(req,res)=>{
  
  const { receiptNumber } = req.body;
  if (!receiptNumber) return res.status(400).json({ message: "Missing receipt number" });

  const exists = await Receipt.findOne({ receiptNumber });
  res.json({ exists: !!exists });
}

module.exports={uploadReceipt,checkReceipt}
