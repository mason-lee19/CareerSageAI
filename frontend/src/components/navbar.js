import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

import { useState } from "react";

export default function Navbar() {
  const [user, loading] = useAuthState(auth);
  const [theme, setTheme] = useState('Light');

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen); // Toggle settings visibility
  };

  return (
    <header className="w-full bg-primary px-8 py-6 text-white flex justify-between items-center">
      <h1 className="text-2xl font-title">CareerSageAI</h1>
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
          {!user && (
          <Link href="/auth/login" className="hover:underline">
            Sign In
          </Link>
          )}
          {user && (
            <button onClick={toggleSettings}>
              <img className='w-6 rounded-full cursor-pointer' src={user.photoURL}/>
            </button>
          )}
        </li>
      </ul>
    </nav>

    {/*Settings Page*/}
    <div
            className={`absolute top-0 right-0 w-1/4 shadow-lg transform ${
            isSettingsOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300`}
        >
      <div className="flex items-center justify-between py-6 p-4 bg-gray-500 rounded-tl-lg">
        <h2 className="text-lg font-semibold">Settings</h2>
        <h2 className="text-2xl text-gray-500">-</h2>
        <button
            onClick={toggleSettings}
            className="text-gray-200 hover:text-black px-4"
        >
            ✕
        </button>
        </div>
        <div className="p-4 overflow-y-auto bg-white text-black rounded-bl-lg">
        {/*General Settings*/}
        <h3 className="text-2xl font-semibold mb-4">General Settings</h3>
        <div className="space-y-3">
            <div>
            <label className="block text-gray-700">Theme:</label>
            <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
            </select>
            </div>
        </div>
        {/*Account Settings*/}
        <hr className="my-6 border-t border-gray-300" />

        <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4">Account Settings</h3>
            <div className="space-y-3">
            <div>
                <label className="block text-gray-700">Username:</label>
                <input
                type="text"
                placeholder="Enter your username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-gray-700">Email:</label>
                <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  );
};
