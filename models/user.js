const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const res = require("express/lib/response");

const user = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role:{
    type: String,
    default: "user",
  },
});

user.methods.generateHashedPassword=async function(){
     try{
       //encryption of password
     let salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
     }catch(err){
       res.send("error "+err.message);
     } 
   
}

userModel = mongoose.model("userModel", user);

//for sign up user
function validationInput(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required(),
    role:Joi.string()
  });
  return schema.validate(data);
}

//for sign in  
function validationUser(data) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(10).required()
     
    });
    return schema.validate(data);
  }
  

module.exports.User = userModel;
module.exports.validate = validationInput;
module.exports.validateUser = validationUser;
