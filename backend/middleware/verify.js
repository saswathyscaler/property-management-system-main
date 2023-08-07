const jwt = require("jsonwebtoken"); 
const mongoose = require("mongoose");
const Property = require("../models/property"); // Replace with the correct path to your Property model

const secretKey = process.env.SECRATE; 
require('dotenv').config();

// Middleware to verify user authentication
module.exports.verifyAuth =  (req, res, next) => {
  const token = req.headers.authorization;
  console.log(`Received Token : ${ token }----`);

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing or Invalid authentication token" });
  }
  // Extract the token value without the "Bearer " prefix
  const authToken = token.split(" ")[1];

  jwt.verify(authToken, secretKey, (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({ error: "Unauthorized: Invalid authentication token" });
    }

    console.log("Decoded Token:", decoded);
    req.user = decoded; // Set the user object in the request to the decoded token data
    next();
  });
};







// Middleware to verify user authorization (to check if the user is the author of the property)


module.exports.verifyAuthorization = async (req, res, next) => {
  const propertyId = req.params.propertyId; // Use req.params.propertyId to get the property ID

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ error: "Invalid property ID" });
  }

  const userId = req.user._id;

  try {
    // Find the property by its ID
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Check if the user is the author of the property
    if (!property.author || !property.author.equals(userId)) {
      return res
        .status(403)
        .json({
          error: "Unauthorized: You are not the author of this property",
        });
    }

    next();
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error verifying authorization:", error);
    res
      .status(500)
      .json({ error: "An error occurred while verifying authorization" });
  }
};