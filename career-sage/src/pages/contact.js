import React from "react";
import "../static/style.css";

function Contact(){
  return (
    <div className="flex flex-col items-center justify-center flex-grow px-6 py-12 bg-neutral-100">
    <h1 className="text-2xl font-bold text-neutral-900">Get In Touch</h1>
    <p className="text-lg text-neutral-600 my-4 text-center">
        Have any questions or need help? We'd love to hear from you. Drop us a message and we'll respond as soon as we can.
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
  )
}

export default Contact;

