const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

// ImageSchema.virtual("thumbnail").get(function () {
//   return this.url.replace("/upload", "/upload/w_200");
// });

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
  picture: [ImageSchema],
  price: {
    type: Number,
    required: true,
  },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
