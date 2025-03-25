import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth } from "../utils/firebase";
import { useState } from "react";
import { NavLink } from "../types/navigation";
import UserDropdown from "./UserDropdown";

const NAV_LINKS: NavLink[] = [
  { path: "/home", label: "Home" },
  { path: "/jobsearch", label: "Search Jobs" },
  { 
    path: "/auth/login", 
    label: "Sign In", 
    requiresAuth: false,
    hideWhenAuthed: true 
  },
];

export default function Navbar(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const router = useRouter();

  const toggleSettings = (): void => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await auth.signOut();
      router.push("/home");
    } catch (error: unknown) {
      console.error("Error signing out: ", error instanceof Error ? error.message : error);
    }
  };

  return (
    <header className="w-full bg-primary px-8 py-6 text-white flex justify-between items-center">
      <h1 className="text-2xl font-title">CareerSage</h1>
      <nav>
        <ul className="flex gap-6">
          {NAV_LINKS.map((link) => (
            <NavItem 
              key={link.path}
              link={link}
              isAuthed={!!user}
            />
          ))}
          {user && (
            <li>
              <button onClick={toggleSettings}>
                <img
                  className="w-6 rounded-full cursor-pointer"
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User profile"
                  referrerPolicy="no-referrer"
                />
                <UserDropdown
                  user={user}
                  isOpen={isSettingsOpen}
                  onClose={toggleSettings}
                  onSignOut={handleSignOut}
                />
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

function NavItem({ link, isAuthed }: { link: NavLink; isAuthed: boolean }) {
  if (link.requiresAuth === false && isAuthed) return null;
  if (link.hideWhenAuthed && isAuthed) return null;
  
  return (
    <li>
      <Link href={link.path} className="hover:underline">
        {link.label}
      </Link>
    </li>
  );
}