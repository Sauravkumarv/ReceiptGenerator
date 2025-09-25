// middleware/jwtAuth.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const USER = require("../model/SignUp");

dotenv.config();

const secretKey = process.env.SECRET_KEY; // ✅ fixed typo

const jwtAuth = async (req, res, next) => {
  try {
    // Get token from either header OR cookie
    const authHeader = req.headers["authorization"];
    const token =
      authHeader?.startsWith("Bearer ") 
        ? authHeader.split(" ")[1] 
        : req.cookies?.authToken;

    if (!token) {
      return res.status(401).json({ message: "⚠️ No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, secretKey);

    // Fetch fresh user (optional but recommended)
    const user = await USER.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "⚠️ User not found" });
    }

    req.user = user; // attach full user object
    next();
  } catch (err) {
    res.status(401).json({ message: "⚠️ Invalid or expired token", error: err.message });
  }
};

module.exports = jwtAuth;
