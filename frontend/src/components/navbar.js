import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

export default function Navbar() {
  const [user, loading] = useAuthState(auth);


  return (
    <header className="w-full bg-primary px-8 py-6 text-white flex justify-between items-center">
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
          {!user && (
          <Link href="/auth/login" className="hover:underline">
            Sign In
          </Link>
          )}
          {user && (
            <Link href="/user-settings">
              <img className='w-6 rounded-full cursor-pointer' src={user.photoURL}/>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  </header>
  );
};
