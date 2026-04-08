"use client";

import { useState, useEffect, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";

const privacyTypes = [
  {
    field: "allowMessages" as const,
    label: "Allow messages from anyone",
    description: "Let anyone send you direct messages",
  },
  {
    field: "showInSearch" as const,
    label: "Show profile in search",
    description: "Make your profile discoverable in search results",
  },
];

type PrivacyFields = {
  allowMessages: boolean;
  showInSearch: boolean;
};

const PrivacySettings = () => {
  const [settings, setSettings] = useState<PrivacyFields>({
    allowMessages: true,
    showInSearch: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/user/privacy");
        if (!res.ok) throw new Error();
        const data: PrivacyFields = await res.json();
        setSettings(data);
      } catch {
        toast.error("Failed to load privacy settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleToggle = useCallback(
    async (field: keyof PrivacyFields, checked: boolean) => {
      const previous = settings[field];
      setSettings((prev) => ({ ...prev, [field]: checked }));

      try {
        const res = await fetch("/api/user/privacy", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ field, value: checked }),
        });

        if (!res.ok) {
          const { error } = await res.json();
          throw new Error(error);
        }
      } catch {
        setSettings((prev) => ({ ...prev, [field]: previous }));
        toast.error("Failed to update setting");
      }
    },
    [settings]
  );

  return (
    <div className="space-y-3 h-full max-sm:min-h-[60vh]">
      <h2 className="md:text-xl font-medium leading-4.5 tracking-normal mb-8">
        Privacy Settings
      </h2>

      <div className="space-y-7">
        {privacyTypes.map((type) => (
          <div key={type.field} className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="md:text-base text-sm font-medium">{type.label}</h4>
              <p className="text-xs text-grey md:text-sm font-normal">
                {type.description}
              </p>
            </div>

            <Switch
              checked={settings[type.field]}
              onCheckedChange={(checked) => handleToggle(type.field, checked)}
              disabled={loading}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacySettings;
