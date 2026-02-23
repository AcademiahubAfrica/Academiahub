"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";

const notificationTypes = [
  {
    id: "comments",
    label: "Email on new comments",
    description:
      "Receive notifications when someone comments on your materials",
  },
  {
    id: "likes",
    label: "Email on new likes",
    description: "Receive notifications when someone likes your materials",
  },
  {
    id: "messages",
    label: "Email on new messages",
    description: "Receive notifications for new direct messages",
  },
  {
    id: "follows",
    label: "Email on new uploads from followed authors",
    description:
      "Receive notifications when someone comments on your materials",
  },
];

const NotificationsSettings = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    comments: false,
    likes: false,
    messages: false,
    follows: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSettings({
        comments: true,
        likes: false,
        messages: false,
        follows: true,
      });
    };
    fetchSettings();
  }, []);

  const handleToggle = async (id: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: checked }));

    try {
      console.log(`Updating ${id} to:`, checked);
      // call api
      //   add debounce logic
      // add toast notification
    } catch (error) {
      setSettings((prev) => ({ ...prev, [id]: !checked }));
      console.error("Failed to update settings", error);
    }
  };

  return (
    <div className="space-y-3 h-full max-sm:min-h-[60vh]">
      <h2 className="md:text-xl font-medium leading-4.5 tracking-normal mb-8">
        Notification Preferences
      </h2>

      <div className="space-y-7">
        {notificationTypes.map((type) => (
          <div key={type.id} className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="md:text-base text-sm font-medium">{type.label}</h4>
              <p className="text-xs text-grey md:text-sm font-normal">
                {type.description}
              </p>
            </div>

            <Switch
              checked={settings[type.id] || false}
              onCheckedChange={(checked) => handleToggle(type.id, checked)}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSettings;
