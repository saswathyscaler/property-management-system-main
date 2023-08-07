import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import the BrowserRouter as Router
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./components/Property";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Addproperty from "./components/Addproperty";
import Showlist from "./components/Showlist";
import Update from "./components/Update";

function App() {
  return (
    <Router>
      {/* Add the Router component here */}
      <>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/property" element={<Property />} />
          <Route exact path="property/addproperty" element={<Addproperty />} />
          <Route exact path="property/showlist" element={<Showlist />} />
          <Route exact path="property/update" element={<Update />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer />
      </>
    </Router>
  );
}

export default App;
