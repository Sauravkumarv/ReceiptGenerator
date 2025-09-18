const express=require("express");
const { RegisterNewUser, LoginUser, Logout } = require("../controller/SignUpController");

const router=express.Router();

router.post('/signup',RegisterNewUser)
router.post('/signin',LoginUser)
router.post('/logout',Logout)
module.exports=router;