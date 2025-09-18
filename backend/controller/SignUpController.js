const USER = require("../model/SignUp");
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv')

dotenv.config();

const secretKey=process.env.SERCRET_KEY;

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

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await USER.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email or Password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Email or Password" });

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, secretKey);

    // Send token as regular cookie (not HttpOnly so frontend can access)
    res.cookie("authToken", token, {
      httpOnly: false, // Frontend se access karne ke liye
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "✅ Login successfull",
      token, // frontend ko bhejo
      user: {
        id: user._id,
        fullname: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: false,
      secure: false, // true in production (HTTPS)
      sameSite: "lax"
    });

    return res.status(200).json({ message: "✅ Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "❌ Server error", error: error.message });
  }
};


module.exports={RegisterNewUser,LoginUser,Logout};