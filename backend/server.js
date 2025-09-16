const express=require('express')
const dotenv=require('dotenv');
const dbConnect = require('./config/db');
const router = require('./routes/SignUpRouter');
const cors=require('cors')


const app=express();


dbConnect();
dotenv.config();
app.use(express.json());
app.use(cors())
express.urlencoded()  

// app.get('/',(req,res)=>{
//   res.json({message:"connected"})
// })

app.use('/',router)




const port=process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`server is connected on http://localhost:${port}`)
})