import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, user, userDb } from "../../utils/firebase";
import { useRouter } from "next/router";

import EditableField from "./EditableField";
import PopUpMessage from "../PopUpMessage";

export default function ProfileTab() {
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
  });

  const [error, setError] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const route = useRouter();

  useEffect(() => {
    console.log("User data updated:", userData);
  }, [userData]);

  useEffect(() => {
    if (error) {
      console.error("Error detected:", error);
    }
  }, [error]);

  // Check if the user document exists on first login
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User is logged in:", user.uid);

        const userDocRef = doc(userDb, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          // If the document doesn't exist, create it
          await setDoc(userDocRef, {
            uid: user.uid,
            displayName: user.displayName || "",
            email: user.email || "",
            createdAt: new Date(),
            editDate: new Date(),
          });

          console.log("New user document created!");
          setUserData({
            displayName: user.displayName || "",
            email: user.email || "",
          });
        } else {
          // If the document exists, populate the form with existing data
          const data = userDoc.data();

          console.log("Existing user document:", data);

          setUserData({
            displayName: data.displayName || "",
            email: data.email || "",
          });
        }
      } else {
        // If no user is logged in, redirect to login page
        route.push("/auth/login");
      }
    });
    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [route]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-neutral-600">
          Manage your personal information and documents
        </p>
      </header>
      <div className="flex flex-col gap-6">
        <div>
          <EditableField
            label="Display Name"
            name="displayName"
            value={userData.displayName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <EditableField
            label="Email Address"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
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
