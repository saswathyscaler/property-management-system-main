import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Showlist from "./Showlist";
import UserWidget from "../widgets/UserWidgets";
import Addproperty from "./Addproperty";

const Property = () => {
  const navigate = useNavigate();

  const data = localStorage.getItem("token");
  console.log(data);

  useEffect(() => {
    getAuthData();
    console.log("get auth data");
  }, []);

  const getAuthData = async () => {
    if (!data) {
      toast.warn("plese login ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/login");
    }
  };

 const [showAddProperty, setShowAddProperty] = useState(false);
 const [properties, setProperties] = useState([]);
  const handleAddProperty = () => {
    setShowAddProperty(true); // Show the Addproperty component
  };

  return (
    <div className="w-full px-2 py-[2rem] flex gap-[0.5rem] justify-between relative">
      <div className="fixed w-[21%] ">
        <UserWidget />
        <div>
        
        <button
          className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddProperty}
        >
          Add New Property
        </button>
        </div>
        
      </div>
      <div className="basis-[42%] ml-[28%] ">
        {/* Conditionally render the Addproperty component */}
        {showAddProperty ? (
          <Addproperty setProperties={setProperties} />
        ) : (
          <Showlist properties={properties} />
        )}
      </div>
    </div>
  );
};

export default Property;