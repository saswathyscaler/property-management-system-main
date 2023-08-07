const express = require("express");
const mongoose = require('mongoose');
const Property = require('../models/property');
require("dotenv").config();
// const secretKey = process.env.SECRATE;
// const jwt = require("jsonwebtoken");
const { verifyAuth, verifyAuthorization } = require("../middleware/verify");
const router = express.Router();

// Apply the verifyAuth middleware to the route for adding a new property

router.post("/property/addproperty", verifyAuth, async (req, res) => {
  const { name, description, location, picture, price } = req.body;
  if (!name || !description || !location || !picture || !price) {
    return res.status(403).json({ error: "Please fill up all fields" });
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
      picture,
      price,
      author: req.user._id, // Assign the authenticated user's ID as the author of the property
    });
    await newProperty.save();
    res.status(200).json({ msg: "Property added successfully" });
  } catch (e) {
    res.status(400).json({ msg: e.message }); // Extract the error message and send it as a string
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



router.post("/property/edit/:_id", verifyAuth,verifyAuthorization, async (req, res) => {
  const { name, description, location, picture, price } = req.body;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
    return res.status(400).json({ error: "Invalid property ID" });
  }

  try {
    // Find the property by its ID
    const property = await Property.findById(req.params._id);
    console.log("property", property);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Check if the user is the author of the property
    if (!property.author.equals(req.user.id)) {
      return res
        .status(403)
        .json({
          error: "Unauthorized: You are not the author of this property",
        });
    }

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
    res
      .status(500)
      .json({ error: "An error occurred while updating the property" });
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
