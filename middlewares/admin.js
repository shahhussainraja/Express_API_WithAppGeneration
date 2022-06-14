const { model } = require("mongoose");

function admin(req,res,next){

  if(req.user.role != "admin")
   return res.status(403).send("You are not Authorize For this Operation");
next();

}

module.exports = admin;