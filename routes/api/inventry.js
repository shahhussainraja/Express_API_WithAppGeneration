const express = require("express");
let router = express.Router();

//modelschema
//curly bracket use when file export more then 1 module and parameter in sequence
const { Inventry  } = require("../../models/inventrySchemaModel");
const validateProduct = require("../../middlewares/validateProduct")

router.get("/", (req, res) => {

  res.send("<h1>Server is Running </h1>");
  // res.render("../views/index");
});

router.post("/post",validateProduct,async (req, res) => {
  try {
    let data = req.body;
    const inventry = new Inventry({
      model: data.model,
      price: data.price,
      units: data.units,
    });
    const result = await Inventry(inventry.save());
    // const result = inventry.save();//this will no work in this WAY give promise panding
    res.send(result);
    console.log(result);
  } catch (err) {
    console.log("error " + err.message);
    res.status(400).send(err.message);
  }
});

router.get("/getdata", async (req, res) => {
  try {
    const data = await Inventry.find();
    if (!data) return res.status(400).send("Data not found In dataBase");
    // data.splice(1, 1);
    res.send(data);
  } catch (err) {
    console.log("Error " + err.message);
  }
});

router.get("/getdata/:index", async (req, res) => {
  try {
    let data = await Inventry.findById(req.params.index);
    console.log(data);
    res.send(data);
  } catch (err) {
    res.status(400).send("invalidInput");
    console.log("InventryRouterClass Error " + err.message);
  }
});

router.put("/update/:index", async (req, res) => {
  try {
    let inventry = await Inventry.findById(req.params.index);
    if (!inventry) return res.status(400).send("Item not found in DataBase");
    inventry.model = req.body.model;
    inventry.price = req.body.price;
    inventry.units = req.body.units;

    let result = await inventry.save();
    console.log(result);
    res.send("Updated Data Successfully  " + result);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

router.delete("/delete/:index", async (req, res) => {
  try {
    let data = await Inventry.deleteOne({ _id: req.params.index });
    res.send(data + " is successfully deleted");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
