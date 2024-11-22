import React from 'react';
import '../static/style.css';

function Navbar() {
  return (
    <nav>
    <ul className="flex gap-6">
      <li>
        <a href="#" className="hover:underline">
          Home
        </a>
      </li>
      <li>
        <a href="#" className="hover:underline">
          Search Jobs
        </a>
      </li>
      <li>
        <a href="#" className="hover:underline">
          Interview Prep
        </a>
      </li>
      <li>
        <a href="#" className="hover:underline">
          Contact
        </a>
      </li>
      <li>
        <a href="#" className="hover:underline">
          Sign In
        </a>
      </li>
    </ul>
  </nav>
  );
}

export default Navbar;