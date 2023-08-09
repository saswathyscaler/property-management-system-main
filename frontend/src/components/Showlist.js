import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Update from "./Update";
import { Link } from "react-router-dom";
import PropertyCard from "../widgets/PropertyCard";

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
      const response = await fetch(
        `http://localhost:${port}/property/showproperty`
      );
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
      if (!token) {
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
      const response = await fetch(
        `http://localhost:${port}/property/delete/${propertyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
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

        // Fetch the updated properties after deletion
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );
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
        toast.error(
          "Unauthorized: You are not authorized to delete this property",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
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
      {showUpdate && (
        <Update
          propertyId={currentPropertyId}
          closeUpdate={() => setShowUpdate(false)}
        />
      )}
      <div className="max-w-screen">
        <h2 className="text-3xl text-blue-700 font-bold text-center mb-4">
          Property List
        </h2>
        <div className="grid lg:grid-cols-4 w-[98%] ml-2 sm:grid-cols-1 gap-4">
          {properties.map((property) => (
            <Link key={property._id} to={`/property/${property._id}`}>
              <PropertyCard
                property={property}               
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Showlist;
