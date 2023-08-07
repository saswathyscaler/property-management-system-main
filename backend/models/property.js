const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
