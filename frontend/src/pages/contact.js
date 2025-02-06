import React from "react";

function Contact() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow px-6 py-12 min-h-[800px]">
      <h1 className="text-2xl font-bold">Get In Touch</h1>
      <p className="text-lg text-black my-4 w-[40%] text-center">
        Have any questions or need help? We'd love to hear from you. Drop us a
        message and we'll respond as soon as we can.
      </p>
      <form className="flex flex-col gap-4 w-[40%] max-w-md">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <textarea
          placeholder="Your Message"
          className="w-full px-4 py-2 border border-neutral-300 rounded-md h-[120px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="py-2 px-6 rounded-md mt-4 bg-black py-4 text-white transition-all hover:bg-gray-600"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
