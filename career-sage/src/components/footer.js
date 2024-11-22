import React from 'react';
import '../static/style.css';

function Footer() {
  return (
    <footer className="w-full bg-neutral-900 text-white py-6 text-center mt-auto rounded-b-lg">
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