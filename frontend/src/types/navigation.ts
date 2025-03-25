import { User } from "firebase/auth";

export interface NavLink {
  path: string;
  label: string;
  icon?: string;
  requiresAuth?: boolean;
  hideWhenAuthed?: boolean;
}

export interface UserDropdownProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => Promise<void>;
}