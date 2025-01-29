import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, user, userDb } from "../utils/firebase";
import { useRouter } from "next/router";
import PopUpMessage from "../components/PopUpMessage";

const UserSettings = () => {
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
    <div className="max-w-4xl mx-auto p-8 py-16">
      {" "}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-neutral-600">
          Manage your personal information and documents
        </p>
      </header>
      <PopUpMessage success={isSuccess} message={message} />
      <form /*onSubmit={handleUpdateProfile}*/ className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="displayName" className="block text-sm font-medium">
              Display Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
              id="displayName"
              name="displayName"
              autoComplete="username"
              value={userData.displayName}
              onChange={handleInputChange}
              placeholder="Enter your display name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email Address
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
              placeholder="Enter your email address"
              id="email"
              name="email"
              autoComplete="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        {/*
        <div className="space-y-2">
          <label className="block text-sm font-medium">Resume</label>
          <div className="flex items-center justify-center w-full bg-white">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer hover:bg-neutral-50 transition-all duration-200">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <span className="material-symbols-outlined text-4xl mb-2">
                  upload_file
                </span>
                <p className="mb-2 text-sm">Click to upload or drag and drop</p>
                <p className="text-xs text-neutral-500">
                  PDF or DOCX (MAX. 10MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                id="resume"
                name="resume"
                //onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              {userData.resume && (
                <p className="text-sm text-gray-500 mt-2">
                  Uploaded: {userData.resume}
                </p>
              )}
            </label>
          </div>
        </div>
        */}

        <div className="flex justify-end space-x-4">
          <button
            className="px-6 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 transition-all duration-200"
            onClick={(e) => handleCancel(e)}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-primary hover:bg-blue-600 text-white transition-all duration-200"
            /*type="submit"*/
            onClick={(e) => handleUpdateProfile(e)}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
