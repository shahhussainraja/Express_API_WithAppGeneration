const mongoose = require("mongoose");

const InventrySchema = new mongoose.Schema({
  model: String,
  price: Number,
  units: Number,
});
InventryModel = mongoose.model("inventryModel", InventrySchema);
module.exports = InventryModel;
