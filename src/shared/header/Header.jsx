import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import MainNav from "./MainNav";
import HomePage from "../../pages/HomePage";
import ContactPage from "../../pages/ContactPage";
import AboutPage from "../../pages/AboutPage";
// Edit
import Details from "../../Components/Details";

const Header = () => {
  return (
    <Router>
      <MainNav />
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Header;
