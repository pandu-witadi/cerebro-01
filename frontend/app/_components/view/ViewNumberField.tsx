"use client";

import React from "react";
import {SettingsConfiguration, NumberFieldSetting, KeySettingConfiguration} from "@/app/_components/types/settings";

interface NumberFieldComponentProps {
  title: string;
  NumberFieldSetting: NumberFieldSetting;
  setting: KeySettingConfiguration;

  settingsConfig: SettingsConfiguration;
  setSettingsConfig: (settings: any) => void;
}

const ViewNumberField: React.FC<NumberFieldComponentProps> = ({
  title,
  NumberFieldSetting,
  setting,
  settingsConfig,
  setSettingsConfig,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setSettingsConfig((prevConfig: any) => {
      // Creating a deep copy of prevConfig to avoid mutating the original state directly
      const newConfig = JSON.parse(JSON.stringify(prevConfig));

      // Updating the copied state
      newConfig[setting].settings[title].value = newText;

      // Return the updated copy
      return newConfig;
    });
  };

  return (
    <div key={title} className="flex flex-col gap-1">
      <div className="flex items-start justify-start">
        <p>{NumberFieldSetting.description}</p>
      </div>
      <div className="flex items-center justify-start">
        <label className="input input-bordered flex items-center gap-2 w-64">
          <input
            type="number"
            className="grow"
            placeholder={title}
            value={(settingsConfig[setting].settings as any)[title].value}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ViewNumberField;
