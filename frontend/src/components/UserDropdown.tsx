import Link from "next/link";
import { UserDropdownProps } from "../types/navigation";

export default function UserDropdown({
  user,
  isOpen,
  onClose,
  onSignOut,
}: UserDropdownProps): JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className="absolute right-8 mt-2 gap-8 bg-white shadow-lg rounded-md z-20">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <div className="p-2 text-sm">
        <div className="flex mb-2 text-gray-800">My Account</div>
        <hr className="my-2 border-t border-gray-300" />
        <DropdownItem 
          href="/settings" 
          icon="settings" 
          label="Settings" 
        />
        <hr className="my-2 border-t border-gray-300" />
        <DropdownItem 
          href="/bookmarks" 
          icon="bookmark" 
          label="Bookmarked Jobs" 
        />
        <DropdownItem 
          href="/analytics" 
          icon="analytics" 
          label="Analytics Dashboard" 
        />
        <hr className="my-2 border-t border-gray-300" />
        <DropdownItem 
          href="/contact" 
          icon="mail" 
          label="Contact" 
        />
        <hr className="my-2 border-t border-gray-300" />
        <button
          className="flex w-full text-gray-800 hover:text-gray-100 transition-colors"
          onClick={onSignOut}
        >
          <span className="material-symbols-outlined text-gray-800 mr-2">
            logout
          </span>
          Logout
        </button>
      </div>
    </div>
  );
}

function DropdownItem({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <div className="flex mb-2">
      <span className="material-symbols-outlined text-gray-800 mr-2">
        {icon}
      </span>
      <Link href={href} className="text-gray-800 hover:text-gray-100 transition-colors">
        {label}
      </Link>
    </div>
  );
}