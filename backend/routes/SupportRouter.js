const express=require("express");
const { SupportController } = require("../controller/SupportController");

const SupportRouter=express.Router();

SupportRouter.post("/contact",SupportController)



module.exports={SupportRouter};