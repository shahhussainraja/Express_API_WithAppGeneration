const mongoose = require("mongoose");
const Joi = require("joi");

const InventrySchema = new mongoose.Schema({
  model: String,
  price: Number,
  units: Number,
});
InventryModel = mongoose.model("inventryModel", InventrySchema);

//validation for Comoing input

function validationInput(data) {
  const schema = Joi.object({
    model: Joi.string().min(4).required(),
    price: Joi.number().required(),
    units: Joi.number().required(),
  });
  return schema.validate(data);
}

module.exports.Inventry = InventryModel;
module.exports.validate = validationInput;
