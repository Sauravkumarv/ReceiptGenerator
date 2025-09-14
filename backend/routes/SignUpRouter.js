const express=require("express");
const { RegisterNewUser, LoginUser } = require("../controller/SignUpController");

const router=express.Router();

router.post('/signup',RegisterNewUser)
router.post('/signin',LoginUser)

module.exports=router;