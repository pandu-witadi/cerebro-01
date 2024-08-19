"use client";

import React from "react";
import {SettingsConfiguration, CheckboxSetting, KeySettingConfiguration} from "@/app/_components/types/settings";

interface CheckComponent {
  title: string;
  CheckboxSetting: CheckboxSetting;
  setting: KeySettingConfiguration;

  settingsConfig: SettingsConfiguration;
  setSettingsConfig: (settings: any) => void;
}

const ViewCheckField: React.FC<CheckComponent> = ({
  title,
  CheckboxSetting,
  setting,
  settingsConfig,
  setSettingsConfig,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.checked;
    setSettingsConfig((prevConfig: any) => {
      // Creating a deep copy of prevConfig to avoid mutating the original state directly
      const newConfig = JSON.parse(JSON.stringify(prevConfig));

      // Updating the copied state
      newConfig[setting].settings[title].checked = newText;

      // Return the updated copy
      return newConfig;
    });
  };

  return (
    <div key={title} className="flex flex-col gap-2">
      <div className="flex items-start">
        <p>{CheckboxSetting.description}</p>
      </div>
      <div className="flex items-center justify-start">
        <input
          type="checkbox"
          className="toggle"
          checked={(settingsConfig[setting].settings as any)[title].checked}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ViewCheckField;
