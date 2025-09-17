const express=require('express')
const dotenv=require('dotenv');
const dbConnect = require('./config/db');
const router = require('./routes/SignUpRouter');
const cors=require('cors')
const cookieParser =require('cookie-parser')

const app=express();


dbConnect();
dotenv.config();
app.use(cookieParser())
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
 

// app.get('/',(req,res)=>{
//   res.json({message:"connected"})
// })

app.use(cors({
  origin:process.env.FRONTEND_URL, // your frontend URL
  credentials: true
}));


app.use('/',router)




const port=process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`server is connected on http://localhost:${port}`)
})