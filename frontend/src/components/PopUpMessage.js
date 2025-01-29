import React, { useState, useEffect } from "react";

const ErrorMessage = ({ success, message }) => {
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true);
    }
  }, [message]);

  if (!message || !isVisible) return null;

  return (
    <div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-2xl p-8 transition-all duration-300 ease-in-out hover:scale-[1.02] ${
        success ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <p className="text-l text-center py-4">{message}</p>
      <div className="flex justify-center"></div>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setVisible(false)}
          className="text-gray-400 hover:text-gray-600 transform transition-all duration-300 hover:rotate-90"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
