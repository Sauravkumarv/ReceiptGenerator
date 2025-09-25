const  cloudinary=require('cloudinary').v2
const  dotenv=require('dotenv')

dotenv.config(); // 🔹 .env file se API keys load karega

// 🔹 Cloudinary Config Setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   // Tumhara Cloudinary ka naam
  api_key: process.env.CLOUDINARY_API_KEY,   // API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Secret key
});


module.exports= cloudinary;
