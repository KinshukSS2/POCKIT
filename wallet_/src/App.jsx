// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainDashboard from "./components/MainDashboard";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";




export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/MainDashBoard" element={<MainDashboard />} />
        <Route path="/about" element={<AboutUs />} />
        {/* <Route path="/NFTMinter" element={<NFTMinter/>} /> */}
      </Routes>
    </Router>
  );
}


