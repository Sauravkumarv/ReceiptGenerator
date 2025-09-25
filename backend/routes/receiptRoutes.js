const express = require("express");
const router = express.Router();

const { uploadReceipt, checkReceipt, getUserReceipts } = require("../controller/receiptController");
const upload = require("../middleware/uploadMiddleware");
const jwtAuth=require("../middleware/authjwt")

// POST /upload
router.post("/upload",jwtAuth,upload.single("receiptPdf"), uploadReceipt);

router.post("/check-receipt",checkReceipt)
router.get('/file',jwtAuth,getUserReceipts)

module.exports = router;