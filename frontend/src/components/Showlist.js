import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Update from "./Update";
import { Link } from "react-router-dom";


const port = 7000;

const Showlist = () => {
  const [properties, setProperties] = useState([]);
  const [token, setToken] = useState("");

  const [showUpdate, setShowUpdate] = useState(false);
  const [currentPropertyId, setCurrentPropertyId] = useState("");

  useEffect(() => {
    fetchProperties();
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`http://localhost:${port}/property/showproperty`);
      const data = await response.json();

      if (response.status >= 400 || !data) {
        toast.error("Failed to fetch properties", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setProperties(data);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("An error occurred while fetching properties", {
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

  const handleEditProperty = async (propertyId) => {
    try {
      // Check if the user is authenticated and has the appropriate role
      if (!token) {
        // Modify "admin" to the appropriate role that can edit properties
        toast.error("You need to be an authorized user to edit a property", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }

      setCurrentPropertyId(propertyId);
      setShowUpdate(true);
    } catch (error) {
      console.error("Error occurred while editing property", error);
      toast.error("An error occurred while editing the property", {
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



  const handleDeleteProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:${port}/property/delete/${propertyId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

        // Fetch the updated properties after deletion
        const updatedProperties = properties.filter((property) => property._id !== propertyId);
        setProperties(updatedProperties);
      } else if (response.status === 400) {
        const errorData = await response.json();
        toast.error(errorData.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (response.status === 404) {
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
      } else if (response.status === 403) {
        toast.error("Unauthorized: You are not authorized to delete this property", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Failed to delete property", {
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
      console.error("Error occurred while deleting property", error);
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



  return (
    <>
      {showUpdate && <Update propertyId={currentPropertyId} closeUpdate={() => setShowUpdate(false)} />}
      <div className="min-w-fit">
        <h2 className="text-3xl text-blue-700 font-bold text-center mb-4">Property List</h2>
        <div className="grid grid-cols-1 sm:grid-cols- md:grid-cols-3 gap-4">
          {properties.map((property) => (

            <div key={property._id} className="border p-4 rounded-lg shadow-md w-60">
            
            
            {<h3 className="text-lg font-bold mb-2">{property.name.slice(0, 20)}</h3>}
           
             
              <img src={property.picture[0].url} className="w-44 h-28 "  alt="" />
              <p className="mb-2">
                <span className="font-bold">Price:</span> ₹ {property.price}
              </p>
              <p className="mb-2">
                <span className="font-bold">Location:</span> {property.location}
              </p>
              <div className="h-20 overflow-y-auto mb-2"> {/* Limit the height and enable vertical scrolling */}
                <p className="mb-2">
                  <span className="font-bold">Description:</span> {property.description.slice(0, 40)}
                </p>
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleEditProperty(property._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDeleteProperty(property._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Showlist;
