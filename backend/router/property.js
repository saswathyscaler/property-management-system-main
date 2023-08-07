const express = require("express");
const mongoose = require('mongoose');
const Property = require('../models/property');
require("dotenv").config();
const { storage } = require("../cloudinary/index");



const multer = require("multer")
const upload = multer({ storage: storage });


const { verifyAuth, verifyAuthorization } = require("../middleware/verify");
const router = express.Router();






// Apply the verifyAuth middleware to the route for adding a new property


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



//route for show / retrieve the property
router.get("/property/showproperty", async (req, res) => {
  try {
    // Retrieve all properties from the database
    const properties = await Property.find();

    // Check if there are any properties in the database
    if (properties.length === 0) {
      return res.status(404).json({ error: "No properties found" });
    }
    // If properties are found, send them as a response
    res.status(200).json(properties);
  } catch (error) {
    // If an error occurs during the database query, handle it
    console.error("Error retrieving properties:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving properties" });
  }
});
router.post("/property/edit/:propertyId", verifyAuth, verifyAuthorization, async (req, res) => {
  const { name, description, location, picture, price } = req.body;
  const propertyId = req.params.propertyId; // Get the property ID from the route parameters

  try {
    // Find the property by its ID
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Check if the user is the author of the property (this check is already done in verifyAuthorization middleware)
    // No need to repeat it here, so you can directly update the property fields

    // Update the property fields with the new values
    property.name = name;
    property.description = description;
    property.location = location;
    property.picture = picture;
    property.price = price;

    // Save the updated property
    await property.save();

    res.status(200).json({ msg: "Property updated successfully" });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ error: "An error occurred while updating the property" });
  }
});
//route to delete the property


router.delete(
  "/property/delete/:propertyId",
  verifyAuth,
  verifyAuthorization,
  async (req, res) => {
    const propertyId = req.params.propertyId; // Use req.params.propertyId to get the property ID

    console.log(`propertyId ${propertyId}`);

    try {
      // Check if the provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(propertyId)) {
        return res.status(400).json({ error: "Invalid property ID" });
      }

      // Find the property by its ID and delete it
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
  }
);

module.exports = router;
