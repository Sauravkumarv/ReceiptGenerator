const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secretKey = process.env.SECRET_KEY;

const jwtAuth = (req, res, next) => {
  try {
    // 1️⃣ Cookie se token le
    const token = req.cookies.authToken; 
    if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

    // 2️⃣ Token verify
    const decoded = jwt.verify(token, secretKey);
    
    // 3️⃣ User info req me attach
    req.user = {
      id: decoded.id,
  fullName: decoded.fullName,
  email: decoded.email
    };
    
    next();
  } catch (err) {
    console.error("JWT Auth Error:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = jwtAuth;
