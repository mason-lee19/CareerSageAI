import React from "react";
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Contact from "./pages/contact.js";
import Home from "./pages/home.js";
import JobSearch from "./pages/jobsearch.js";
import Login from "./pages/auth/login.js";
import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";

function App() {
  return (
    <BrowserRouter>
      <div id="webcrumbs">
        <div className="w-full min-h-screen bg-neutral-300 shadow-lg flex flex-col">
          {" "}
          <Navbar/>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/jobsearch" element={<JobSearch />} />
            <Route path="/auth/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/home" element={<Footer />} />
            <Route path="/contact" element={<Footer />} />
            <Route path="/jobsearch" element={<Footer />} />
            <Route path="/auth/login" element={<Footer />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
