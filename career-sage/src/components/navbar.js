import React from "react";
import { Link } from "react-router-dom";
import "../static/style.css";

function Navbar() {
  return (
    <nav>
      <ul className="flex gap-6">
        <li>
          <Link to="/home" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobsearch" className="hover:underline">
            Search Jobs
          </Link>
        </li>
        <li>
          <Link to="/interviewprep" className="hover:underline">
            Interview Prep
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
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
