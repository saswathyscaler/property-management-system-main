import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Update from "./Update";
import { toast } from "react-toastify";



const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);

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

  const handleEditProperty = () => {
    setShowUpdate(true);
  };
  const handleDeleteProperty = async () => {
    try {
      const accessToken = localStorage.getItem("token");

      if (!accessToken) {
        console.error("Access token not found in local storage");
        return;
      }

      const response = await fetch(
        `http://localhost:7000/property/delete/${propertyId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Property deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        navigate("/property");
      } 
      
      else if (response.status === 404) {
        console.log("Property not found");
      }
      
      else if (response.status === 404) {
        toast.error("Property not found", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } 
    } catch (error) {
      console.error("An error occurred while deleting the property:", error);
      toast.error("An error occurred while deleting the property", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  if (!property) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="flex flex-col m-5 " >
        <h1 className="font-extralight text-2xl items-center">
          {property.name.toUpperCase()}
        </h1>
        <div className="flex justify-between gap-6 mt-4">
          <img
            src={property.picture[0].url}
            alt={property.name}
            className="w-1/2 h-80 border rounded-lg"
          />

          <div className="w-1/2">
            <h1>
              <span className="font-bold text-blue-300">Price :  </span>₹
              {property.price}
            </h1>

            <h1>
              <span className="font-bold text-blue-300">Location :  </span>
              {property.location}
            </h1>
            <div className="">
              <h1 className="font-bold text-blue-300">About This Property : </h1>
              <p>Description: {property.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleEditProperty}
          className="bg-blue-500 p-4 border rounded-md mx-2"
        >
          Edit Property
        </button>
        <button
          onClick={handleDeleteProperty}
          className="bg-red-500 p-4 border rounded-md mx-2"
        >
          Delete Property
        </button>
      </div>
      <button
        onClick={() => navigate("/property")}
        className="bg-blue-300 p-4 border rounded-md ml-5 mb-3"
      >
        Back to Property List
      </button>

      {showUpdate && (
        <Update
          propertyId={propertyId}
          closeUpdate={() => setShowUpdate(false)}
        />
      )}
    </>
  );
};

export default PropertyDetails;
