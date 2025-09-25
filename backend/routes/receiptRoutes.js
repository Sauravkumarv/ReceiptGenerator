const express = require("express");
const router = express.Router();

const { uploadReceipt, checkReceipt, getUserReceipts } = require("../controller/receiptController");
const upload = require("../middleware/uploadMiddleware");

// POST /upload
router.post("/upload", upload.single("receiptPdf"), uploadReceipt);

router.post("/check-receipt",checkReceipt)
router.get('/file/:id',getUserReceipts)

module.exports = router;
