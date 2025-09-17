const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
fullName:{
  type:String,
  required:true
},
email:{
  type:String,
  required:true,
  unique:true
},
password:{
  type:String,
  required:true,
  }
  

},{timestamps:true})


// Pre-save hook for hashing
userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next();

  this.password=await bcrypt.hash(this.password,10)
  next();
})


// Compare password method
userSchema.methods.comparePassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

const USER=mongoose.model("user",userSchema)
module.exports=USER;