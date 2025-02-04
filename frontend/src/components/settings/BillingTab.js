import React, { useState, useEffect } from "react";

import EditableField from "./EditableField";
import PopUpMessage from "../PopUpMessage";

export default function BillingTab() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (error) {
      console.error("Error detected:", error);
    }
  }, [error]);

  const handleUpdateProfile = async (event) => {
    event?.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      route.push("/auth/login");
      return;
    }

    if (!userData.displayName.trim() || !userData.email.trim()) {
      setMessage("Please fill out all fields.");
      setIsSuccess(false);
      return;
    }

    try {
      const userDocRef = doc(userDb, "users", user.uid);

      await updateDoc(userDocRef, {
        displayName: userData.displayName,
        email: userData.email,
        editDate: new Date(),
      });

      setMessage("Your account details have been saved!");
      setIsSuccess(true);
      setError(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message);
      setMessage("Unable to update account details. Please try again.");
      setIsSuccess(false);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="space-y-6">
      <header className="mb-8 mt-4">
        <h1 className="text-3xl font-bold mb-2">Billing Settings</h1>
        <p className="text-neutral-600">Manage your billing information</p>
      </header>
      <div className="flex flex-col gap-6">{/*Editable fields go here */}</div>
      <div className="flex space-x-4">
        <div className="justify-start">
          <button
            className="px-6 py-2 rounded-lg bg-primary hover:bg-blue-600 text-white transition-all duration-200"
            onClick={(e) => handleUpdateProfile(e)}
          >
            Save
          </button>
          <button
            className="px-6 py-2 mx-4 rounded-lg border border-neutral-300 hover:bg-neutral-50 transition-all duration-200"
            onClick={(e) => handleCancel(e)}
          >
            Cancel
          </button>
        </div>
      </div>
      <PopUpMessage success={isSuccess} message={message} />
    </div>
  );
}
