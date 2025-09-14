const mongoose=require("mongoose")
const dotenv=require('dotenv')

dotenv.config();

const dbConnect=async()=>{
try {
  await mongoose.connect(process.env.MONGO_URL);
 
} catch (error) {
  console.log("Mongoose connection failed "+ error);
}
console.log("mongoose connected")
}

module.exports=dbConnect;