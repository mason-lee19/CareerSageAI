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
              {isSettingsOpen && (
                <div className="absolute right-2 mt-8 gap-8 bg-white shadow-lg rounded-md z-20">
                  <div className="p-4">
                    {/* Go To Settings */}
                    <div className="flex justify-center mb-4">
                      <Link
                        href="/settings"
                        className="text-gray-800 px-4 hover:text-gray-100 transition-colors"
                      >
                        Settings
                      </Link>
                    </div>
                    <hr className="my-2 border-t border-gray-300" />
                    {/* Log Off */}
                    <div className="flex justify-center">
                      <button
                        className="text-gray-800 px-4 hover:text-gray-100 transition-colors"
                        // Add log-off function
                      >
                    Log Off
                  </button>
                </div>
              </div>
            </div>
          )}
            </button>
          )}
        </li>
      </ul>
    </nav>
  </header>
  );
};
