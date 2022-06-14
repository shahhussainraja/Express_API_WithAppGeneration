const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { append } = require("express/lib/response");
let router = express.Router();

let { User } = require("../../models/user");

router.post("/signUp", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("Email is already Exist failed to register");
    user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    await user.generateHashedPassword();

    let result = await user.save();
    res.send(result);
    console.log(result);
  } catch (err) {
    res.status(400).send("error " + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid User Email");

    let isVAlid = await bcrypt.compare(req.body.password, user.password);
    if (!isVAlid) return res.status(400).send("Invalid password");

    //here i have assign login user his detail and token with are embeded
    let token = jwt.sign({ user:user}, "myprivatekey");
    res.send(token);

    console.log(user);
  } catch (err) {
    res.status(400).send("error " + err.message);
  }
});

module.exports = router;
