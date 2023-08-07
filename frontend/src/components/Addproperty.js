import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const port =7000


const Addproperty = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    picture: "",
  });

  const [showAddProperty, setShowAddProperty] = useState(false);

  const toggleAddPropertyPopup = () => {
    setShowAddProperty((prev) => !prev);
  };

  const [token, setToken] = useState(""); // Store token in state

  const navigate = useNavigate();
  const nav = () => {
    navigate("/property");
  };

  useEffect(() => {
    getAuthdata();
  }, []);

  const getAuthdata = async () => {
    const data = localStorage.getItem("token");
    if (!data) {
      toast.warn("please login ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/login");
    } else {
      setToken(data); // Set the token in state if it exists
    }
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const addproperty = async (e) => {
    e.preventDefault();
    const { name, description, location, price, picture } = input;
    if (!name || !description || !location || !price || !picture) {
      toast.warn("All fields are required", {
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

    // Check if the user is authenticated
    if (!token) {
      toast.error("You need to be authenticated to add a new property", {
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

    try {
      const response = await fetch(
        `http://localhost:${port}/property/addproperty`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, description, location, picture, price }),
        }
      );

      const data = await response.json();
      console.log("data", data);
      if (response.status >= 400 || !data) {
        toast.error("Some error occurred while adding the property", {
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
        toast.success("Property added successfully", {
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
    } catch (error) {
      console.error("Error occurred while adding the property", error);
      toast.error("An error occurred while adding the property", {
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

   const handleCancel = () => {
     navigate("/property");
   };


  return (
    <>
      <div className="bg-gray-700 flex justify-center items-center h-screen">
        <div className="bg-gray-100 p-3 border rounded-xl shadow-xl max-w-3xl">
          <h2 className="text-3xl text-blue-700 font-bold  text-center">
            Add new property
          </h2>
          <form className="flex flex-col gap-1 mt-5">
            <label htmlFor="name" className="ml-2">
              Name
            </label>
            <input
              type="text"
              className="p-1 border rounded-lg"
              name="name"
              placeholder="Enter your name of the property"
              onChange={handelChange}
            />

            <label htmlFor="picture" className="ml-2">
              picture
            </label>
            <input
              type="text"
              className="p-1 border rounded-lg"
              name="picture"
              placeholder="Enter "
              onChange={handelChange}
            />

            <label htmlFor="location" className="ml-2">
              Location
            </label>
            <input
              type="text"
              className="p-1 border rounded-lg"
              name="location"
              placeholder="Enter the location of this property"
              onChange={handelChange}
            />

            <label htmlFor="price" className="ml-2">
              Price
            </label>
            <input
              type="text"
              className="p-1 border rounded-lg"
              name="price"
              placeholder="add price"
              onChange={handelChange}
            />
            <label htmlFor="description" className="ml-2">
              Description
            </label>
            <textarea
              type="text"
              className="p-1 border rounded-lg"
              name="description"
              placeholder="Describe something about this property"
              cols={40}
              rows={3}
              onChange={handelChange}
            />
            <button
              onClick={addproperty}
              className="bg-[#074FB2] text-white py-2 rounded-lg mt-3 hover:bg-blue-600"
            >
              Add property
            </button>
          </form>
          {/* Cancel button */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <p className="text-[#074FB2] text-base">Cancel and go back:</p>
            <button
              onClick={handleCancel}
              className="py-2 px-4 bg-white border rounded-lg text-sm hover:bg-slate-400"
            >
              Cancel
            </button>
          </div>
          {/* Home button */}
          <div className="flex justify-center  items-center gap-4 mt-4">
            <p className="text-[#074FB2] text-base">Back to home:</p>
            <button
              onClick={() => navigate("/")}
              className="py-2 px-4 bg-white border rounded-lg text-sm hover:bg-slate-400"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addproperty;