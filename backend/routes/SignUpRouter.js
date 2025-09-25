const express=require("express");
const { RegisterNewUser, LoginUser, Logout, getUserProfile } = require("../controller/SignUpController");
const jwtAuth = require("../middleware/authjwt");

const router=express.Router();

router.post('/signup',RegisterNewUser)
router.post('/signin',LoginUser)
router.post('/logout',Logout)
router.get('/profile', jwtAuth, getUserProfile);

module.exports=router;