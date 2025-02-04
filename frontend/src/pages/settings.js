import React, { useState } from "react";

import ProfileTab from "../components/settings/ProfileTab";
import BillingTab from "../components/settings/BillingTab";
import NotificationTab from "../components/settings/NotificationsTab";

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-4xl mx-auto p-8 py-16">
      <div className="space-y-6">
        <div className="mb-8">
          <div className="flex border-b">
            {["profile", "billing", "notifications"].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 text-lg font-medium capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          <div className="p-4">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "billing" && <BillingTab />}
            {activeTab === "notifications" && <NotificationTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
