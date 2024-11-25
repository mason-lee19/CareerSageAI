import React from "react";

/* Don't forget to download the CSS file too 
OR remove the following line if you're already using Tailwind */

import "./style.css";

export const MyPlugin = () => {
  return (
    <div id="webcrumbs">
      <div className="w-[800px] bg-white rounded-lg shadow-lg min-h-[600px]">
        {" "}
        {/* Navigation Bar */}
        <header className="w-full h-[60px] bg-primary-500 flex justify-between items-center px-6">
          <div className="text-white font-title text-xl">CareerSageAI</div>
          <nav className="flex gap-6">
            <a href="#" className="text-white">
              Home
            </a>
            <a href="#" className="text-white">
              Search Jobs
            </a>
            <a href="#" className="text-white">
              Interview Prep
            </a>
            <a href="#" className="text-white">
              Contact
            </a>
            <a href="#" className="text-white">
              Sign in
            </a>
          </nav>
        </header>
        {/* Contact Page Section */}
        <div className="flex flex-col items-center justify-center flex-grow px-6 py-12 bg-neutral-100">
          <h1 className="text-2xl font-bold text-neutral-900">Get In Touch</h1>
          <p className="text-lg text-neutral-600 my-4 text-center">
            Have any questions or need help? We'd love to hear from you. Drop us
            a message and we'll respond as soon as we can.
          </p>
          <form className="flex flex-col gap-4 w-full max-w-md">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-2 border border-neutral-300 rounded-md h-[120px] focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="bg-primary-500 text-white py-2 px-6 rounded-md mt-4"
            >
              Send Message
            </button>
          </form>
        </div>
        {/* Footer Section */}
        <footer className="w-full h-[60px] bg-neutral-900 flex justify-center items-center">
          <p className="text-white text-sm">
            © 2024 CareerSage. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};
