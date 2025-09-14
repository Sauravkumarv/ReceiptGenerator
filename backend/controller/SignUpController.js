const USER = require("../model/SignUp");

const RegisterNewUser=async(req,res)=>{
try {
  const{fullName,email,password}=req.body;

  let existingUser=await USER.findOne({email});

  if(existingUser) return res.status(400).json({ message: "User already exists!" });

const newUser=await USER.create({
fullName,
email,
password
})
res.status(200).json({
  message: "✅ User registered successfully",
  user: {
    id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
  },
});
} catch (error) {
  res.status(500).json({ message: "❌ Server error", error: error.message });
}

}

const LoginUser=async(req,res)=>{
  try {
const{email,password}=req.body;
    const user=await USER.findOne({email})
    if(!user) return res.status(400).json({ message: "Invalid Email or Password" });

    if(user.password !== password) return res.status(400).json({ message: "Invalid Email or Password" });
    res.status(200).json({
      message: "✅ Login successful",
      user: {
        id: user._id,
        fullname: user.fullName,
        email: user.email,
      },
    });
  }
  
     catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
  
  }
  



module.exports={RegisterNewUser,LoginUser};