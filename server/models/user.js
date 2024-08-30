const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  mobile_no:{
   type:Number,
   required:true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  address:{
    type:String,
    default:true
  },
  orders:{
    type:String,
    default:true
  }
});

const User = mongoose.model("User",userSchema);

module.exports = User
