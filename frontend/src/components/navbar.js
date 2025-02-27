import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth } from "../utils/firebase";
import { useState } from "react";

export default function Navbar() {
  const [user, loading] = useAuthState(auth);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen); // Toggle settings visibility
  };

  const route = useRouter();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      route.push("/home");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="w-full bg-primary px-8 py-6 text-white flex justify-between items-center">
      <h1 className="text-2xl font-title">CareerSage</h1>
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
            {!user && (
              <Link href="/auth/login" className="hover:underline">
                Sign In
              </Link>
            )}
            {user && (
              <button onClick={toggleSettings}>
                <img
                  className="w-6 rounded-full cursor-pointer"
                  src={user.photoURL}
                />
                {isSettingsOpen && (
                  <div className="absolute right-8 mt-2 gap-8 bg-white shadow-lg rounded-md z-20">
                    <link
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
                      rel="stylesheet"
                    />
                    <div className="p-2 text-sm">
                      <div className="flex mb-2 text-gray-800">My Account</div>
                      <hr className="my-2 border-t border-gray-300" />
                      {/* Go To Settings */}
                      <div className="flex mb-2">
                        <span className="material-symbols-outlined text-gray-800 mr-2">
                          person
                        </span>
                        <Link
                          href="/settings"
                          className="text-gray-800 hover:text-gray-100 transition-colors mr-28"
                        >
                          Profile
                        </Link>
                      </div>
                      <div className="flex mb-2">
                        <span className="material-symbols-outlined text-gray-800 mr-2">
                          credit_card
                        </span>
                        <Link
                          href="/settings"
                          className="text-gray-800 hover:text-gray-100 transition-colors"
                        >
                          Billing
                        </Link>
                      </div>
                      <div className="flex mb-2">
                        <span className="material-symbols-outlined text-gray-800 mr-2">
                          settings
                        </span>
                        <Link
                          href="/settings"
                          className="text-gray-800 hover:text-gray-100 transition-colors"
                        >
                          Settings
                        </Link>
                      </div>
                      <hr className="my-2 border-t border-gray-300" />
                      {/* Go To Bookmarked Jobs */}
                      <div className="flex mb-2">
                        <span className="material-symbols-outlined text-gray-800 mr-2">
                          bookmark
                        </span>
                        <Link
                          href="/bookmarks"
                          className="text-gray-800 hover:text-gray-100 transition-colors"
                        >
                          Bookmarked Jobs
                        </Link>
                      </div>
                      <div className="flex mb-2">
                        <span className="material-symbols-outlined text-gray-800 mr-2">
                          dashboard
                        </span>
                        <Link
                          href="/bookmarks"
                          className="text-gray-800 hover:text-gray-100 transition-colors"
                        >
                          Analytics Dashboard
                        </Link>
                      </div>
                      <hr className="my-2 border-t border-gray-300" />
                      {/* Contact Page */}
                      <div className="flex mb-2">
                        <span className="material-symbols-outlined text-gray-800 mr-2">
                          email
                        </span>
                        <Link
                          href="/contact"
                          className="text-gray-800 hover:text-gray-100 transition-colors"
                        >
                          Contact
                        </Link>
                      </div>
                      <hr className="my-2 border-t border-gray-300" />
                      {/* Log Off */}
                      <div className="flex">
                        <span className="material-symbols-outlined text-gray-800 mr-2">
                          logout
                        </span>
                        <button
                          className="text-gray-800 hover:text-gray-100 transition-colors"
                          onClick={handleSignOut}
                        >
                          Logout
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
}
