const jwt = require("jsonwebtoken");

function  auth(req,res,next){

    //check provide  in header  
    let token  = req.header("Authorization");
    if(!token) return res.send("Token is no Provided");

    //here i decode the token which contain  user detail and token
    try{
        let user = jwt.verify(token,"myprivatekey");
        req.user = user;
   
    }catch(err){
        res.status(400).send(err.message);
    }
    
   
  
    
    next();
}

module.exports = auth;