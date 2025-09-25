const mongoose=require('mongoose')
const receiptSchema = new mongoose.Schema({
  filename: { type: String, required: true },        // uploaded file name
  originalName: { type: String, required: true },    // original file name
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional if user system exists
  fileUrl: { type: String, required: true },
  receiptNumber: { type: String,unique:true,required:true},
  storeName: { type: String },
  customerName: { type: String },
  subtotal: { type: Number },
  tax: { type: Number },
  total: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

const Receipt=mongoose.model("Receipt", receiptSchema);

module.exports=Receipt