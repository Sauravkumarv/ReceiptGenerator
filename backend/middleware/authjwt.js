const jwt=require('jsonwebtoken');
const dotenv=require('dotenv')

dotenv.config();

const secretKey=process.env.SERCRET_KEY;


const jwtAuth=(req,res,next)=>{
  const authHeader=req.headers["authorization"]
  if(!authHeader)return res.status(401).json({ message: "No token provided" });

  const token=authHeader.split(" ")[1];
  if(!token)return res.status(401).json({ message: "Invalid token format" });

  try {
    const decoded=jwt.verify(token,secretKey)
     req.user=decoded; // store user info in request
     next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}