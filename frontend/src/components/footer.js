import React from "react";

function Footer() {
  return (
    <footer className="w-full text-primary-500 py-6 text-center mt-auto">
      <p>© 2024 CareerSage. All Rights Reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a href="#">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a href="#">
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
