import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import the BrowserRouter as Router
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./components/Property";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Addproperty from "./components/Addproperty";
import Update from "./components/Update";
import Navbar from "./components/Navbar";
import PropertyDetails from "./components/PropertyDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
    <Navbar />
    {/* Add the Router component here */}
      <>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          <Route exact path="/property" element={<Property />} />
          <Route exact path="property/addproperty" element={<Addproperty />} />
          <Route path="/property/:propertyId" element={<PropertyDetails/> }/>

          <Route exact path="property/update" element={<Update />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>

        <ToastContainer />
      </>
    </Router>
  );
}

export default App;
