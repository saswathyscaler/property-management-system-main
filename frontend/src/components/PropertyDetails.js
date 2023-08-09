import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);

  const navigate = useNavigate();
  console.log("Property ID:", propertyId);

  useEffect(() => {
    console.log("Fetching property details...");
    fetch(`http://localhost:7000/property/${propertyId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched property data:", data);
        setProperty(data);
      })
      .catch((error) => console.error("Error fetching property:", error));
  }, [propertyId]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className=" flex flex-col m-5 ">
        <h2>{property.name}</h2>
        <div className="flex  justify-between  gap-6 mt-4 ">
          <img
            src={property.picture[0].url}
            alt={property.name}
            className="w-1/2 h-96 border rounded-lg"
          />

          <div className="w-1/2 ">
            <p>Price: ₹ {property.price}</p>
            <p>Location: {property.location}</p>
            <p>Description: {property.description}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate("/property")}
        className="bg-blue-300 p-4 border rounded-md ml-5 mb-3"
      >
        Back to Property List
      </button>
    </>
  );
};

export default PropertyDetails;
