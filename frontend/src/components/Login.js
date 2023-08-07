import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import log from "../assets/log1.jpg";

const port = 7000


const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(login);
    const { email, password } = login;
    if (!email || !password) {
      toast.warn("field missing", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email address", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    const response = await fetch(`http://localhost:${port}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    let data = await response.json();

    const { msg, token } = data;
    console.log("token :", token);
    console.log(msg);
    if (msg === "invalid credentials") {
      toast.error("invalid credentials", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    if (response.status >= 400 || !data) {
      toast.error("server error in login", {
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
      toast.success("login successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
 
      localStorage.setItem("token", token);
      console.log("logged in successfully");
      navigate("/Property");
    }
  };

  const navigate = useNavigate();

  const nav = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="bg-gray-700 flex justify-center items-center min-h-screen">
        <div className="bg-gray-100 p-3 border rounded-xl shadow-xl max-w-3xl">
        <h1 className="text-3xl text-blue-700 font-bold  text-center">
          Login Here
        </h1>
        <div className="flex">
        <div className="w-full p-5 ">
          <img src={log} alt='login.png'  className="rounded-2xl"/>
        </div>
            <div className=" w-full px10">

              <form className="flex flex-col gap-1 mt-5">
                <label htmlFor="email" className="ml-2">
                  Email
                </label>
                <input
                  type="email"
                  className="p-2 border rounded-lg"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your email"
                />

                <label htmlFor="password" className="ml-2">
                  password
                </label>
                <input
                  type="password"
                  className="p-2 border rounded-lg"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your password"
                />

                <button
                  onClick={submit}
                  className="bg-[#074FB2] text-white py-2 rounded-lg mt-3 hover:bg-blue-600"
                >
                  Login
                </button>
              </form>

              <div className="flex justify-center  items-center gap-4 mt-4">
                <p className="text-[#074FB2] text-base">
                  Don't have an account:
                </p>
                <button
                  onClick={nav}
                  className="py-2 px-4 bg-white border rounded-lg text-sm hover:bg-slate-400"
                >
                  Register
                </button>
              </div>

              <div className="flex justify-center  items-center gap-4 mt-4">
                <p className="text-[#074FB2] text-base">Back to home :</p>
                <button
                  onClick={() => navigate("/")}
                  className="py-2 px-4 bg-white border rounded-lg text-sm hover:bg-slate-400"
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
