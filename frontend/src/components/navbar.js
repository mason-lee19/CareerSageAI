import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <header className="w-full bg-primary px-8 py-6 text-white flex justify-between items-center rounded-t-lg">
      <h1 className="text-3xl font-title">CareerSageAI</h1>
      <nav>
      <ul className="flex gap-6">
        <li>
          <Link href="/home" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/jobsearch" className="hover:underline">
            Search Jobs
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </li>
        <li>
          <Link href="/auth/login" className="hover:underline">
            Sign In
          </Link>
        </li>
      </ul>
    </nav>
  </header>
  );
}

export default Navbar;
