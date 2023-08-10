const express = require("express");
const mongoose = require("mongoose");
const Property = require("../models/property");
require("dotenv").config();
const { storage ,cloudinary} = require("../cloudinary/index");

const multer = require("multer");
const upload = multer({ storage });

const { verifyAuth, verifyAuthorization } = require("../middleware/verify");
const router = express.Router();


const {
  showProperties,
  editProperty,
  // deleteProperty,
  // getSingleProperty
} = require("../controllers/propertyController");


router.post("/property/addproperty", verifyAuth, upload.single("picture"), async (req, res) => {
  const { name, description, location, price } = req.body;
  if (!name || !description || !location || !price || !req.file) {
    return res.status(403).json({ error: "Please fill up all fields and upload a single picture" });
  }

  const check = await Property.findOne({ name: name });
  if (check) {
    return res.status(401).json({ msg: "Property already exists" });
  }

  try {
    const newProperty = new Property({
      name,
      description,
      location,
      picture: { url: req.file.path, filename: req.file.filename }, // Store the single image details in an object
      price,
      author: req.user._id,
    });

    await newProperty.save();
    res.status(200).json({ msg: "Property added successfully" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});



router.get('/property/showproperty', async (req, res) => {
  try {
    const { price, location } = req.query;

    const filter = {};
    if (price) {
      const [minPrice, maxPrice] = price.split('-');
      filter.price = { $gt: parseInt(minPrice), $lte: parseInt(maxPrice) };
    }
    if (location) {
      filter.location = location;
    }

    const filteredProperties = await Property.find(filter);

    if (filteredProperties.length === 0) {
      return res.status(404).json({ error: 'No properties found' });
    }

    res.status(200).json(filteredProperties);
  } catch (error) {
    console.error('Error retrieving filtered properties:', error);
    res.status(500).json({ error: 'An error occurred while retrieving filtered properties' });
  }
});






router.post("/property/edit/:propertyId", verifyAuth, verifyAuthorization, upload.single("picture"), editProperty);


router.delete("/property/delete/:propertyId", verifyAuth, verifyAuthorization,async (req, res) => {
  const propertyId = req.params.propertyId;

  console.log(`propertyId ${propertyId}`);

  try {
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    const deletedProperty = await Property.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ msg: "Property deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the property" });
  }
})


router.get("/property/:propertyId", async (req, res) => {
  const propertyId = req.params.propertyId;

  try {
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error("Error retrieving property:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the property" });
  }
}
);

module.exports = router;