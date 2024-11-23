import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Contact from "./pages/contact.js"
import Home from "./pages/home.js"
import Navbar from "./components/navbar.js"
import Footer from "./components/footer.js"
import "./static/style.css";


function App(){
  return (
    <BrowserRouter>
      <div id="webcrumbs">
          <div className="w-full min-h-screen bg-neutral-50 shadow-lg rounded-lg flex flex-col">
              {" "}
              <header className="w-full bg-primary px-8 py-6 text-white flex justify-between items-center rounded-t-lg">
              <h1 className="text-3xl font-title">CareerSageAI</h1>
              <Navbar />
              </header>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Routes>
            <Route path="/home" element={<Footer />} />
            <Route path="/contact" element={<Footer />} />
          </Routes>
          </div>
        
      </div>
      
    </BrowserRouter>
  );
};

export default App;
