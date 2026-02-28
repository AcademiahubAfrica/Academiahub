"use client";
import { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import NotificationsSettings from "./NotificationsSettings";
import PrivacySettings from "./PrivacySettings";
import ProfileInfoForm from "./ProfileInfoForm";
import { Bio } from "@/app/_types/author";

interface ProfileData {
  name: string;
  image: string | null;
  bio: Bio | null;
}

const AllForms = ({ profileData }: { profileData: ProfileData }) => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", component: <ProfileInfoForm profileData={profileData} /> },
    { id: "password", label: "Security", component: <ChangePasswordForm /> },
    {
      id: "notifications",
      label: "Notifications",
      component: <NotificationsSettings />,
    },
    { id: "privacy", label: "Privacy", component: <PrivacySettings /> },
  ];

  return (
    <div className="space-y-6  max-sm:p-2 md:space-y-20">
      {/* Mobile Tab Navigation */}
      <div className="md:hidden flex overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 text-center border-b-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? "border-primary  text-primary"
                : "border-transparent text-grey hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mobile Content (Tabbed) */}
      <div className="md:hidden">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>

      {/* Desktop Content (Vertical Stack) */}
      <div className="hidden md:block space-y-20">
        <ProfileInfoForm profileData={profileData} />
        <ChangePasswordForm />
        <NotificationsSettings />
        <PrivacySettings />
      </div>
    </div>
  );
};

export default AllForms;
