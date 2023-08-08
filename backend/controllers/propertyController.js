// propertyController.js
const mongoose = require("mongoose");
const Property = require("../models/property");
const { storage,cloudinary } = require("../cloudinary/index");

const multer = require("multer");
const upload = multer({ storage });


// const addProperty = async (req, res) => {
//     const { name, description, location, price } = req.body;
//     if (!name || !description || !location || !price || !req.file) {
//       return res.status(403).json({
//         error: "Please fill up all fields and upload a single picture",
//       });
//     }

//     try {
//       const check = await Property.findOne({ name: name });
//       if (check) {
//         return res.status(401).json({ msg: "Property already exists" });
//       }

//       const newProperty = new Property({
//         name,
//         description,
//         location,
//         picture: {
//           url: req.file.path,
//           filename: req.file.filename,
//         }, // Store the single image details in an object
//         price,
//         author: req.user._id,
//       });

//       await newProperty.save();
//       res.status(200).json({ msg: "Property added successfully" });
//     } catch (e) {
//       res
//         .status(500)
//         .json({ error: "Failed to add property. Please try again later." });
//     }
//   }




const showProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    if (properties.length === 0) {
      return res.status(404).json({ error: "No properties found" });
    }
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error retrieving properties:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving properties" });
  }
};



const editProperty = async (req, res) => {
  const { name, description, location, price } = req.body;
  const propertyId = req.params.propertyId;

  try {
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    if (req.file) {
      // Delete the old picture from MongoDB if it exists
      if (property.picture && property.picture.filename) {
        // Remove the old image data from MongoDB
        await Property.findByIdAndUpdate(propertyId, { $unset: { picture: 1 } });
      }

      // Upload the new picture to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      property.picture = {
        url: result.secure_url,
        filename: result.public_id
      };
    }

    property.name = name;
    property.description = description;
    property.location = location;
    property.price = price;

    // Save the updated property
    await property.save();

    res.status(200).json({ msg: "Property updated successfully" });
  } catch (error) {
    console.error("Error updating property:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the property" });
  }
};





const deleteProperty = async (req, res) => {
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
};



const getSingleProperty = async (req, res) => {
  const propertyId = req.params.propertyId;

  try {
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    // Find the property by its ID in the database
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
};

module.exports = {
  showProperties,
  editProperty,
  deleteProperty,
  getSingleProperty,
};
