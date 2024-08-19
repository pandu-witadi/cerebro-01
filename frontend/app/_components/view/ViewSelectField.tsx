"use client";

import React from "react";
import {KeySettingConfiguration, SettingsConfiguration, SelectSetting} from "@/app/_components/types/settings";

interface SelectComponentProps {
  title: string;
  SelectSetting: SelectSetting;
  setting: KeySettingConfiguration;
  settingsConfig: SettingsConfiguration;
  setSettingsConfig: (settings: any) => void;
}

const ViewSelectField: React.FC<SelectComponentProps> = ({
  title,
  SelectSetting,
  setting,
  settingsConfig,
  setSettingsConfig,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  console.log(SelectSetting.options)
  return (
    <div key={title} className="flex flex-col gap-1">
      <div className="flex justify-start">
        <div>{SelectSetting.description}</div>
      </div>
      <div className="">
        <select
          value={(settingsConfig[setting].settings as any)[title].value}
          onChange={handleChange}
          className="select w-64 select-bordered"
        >
          {SelectSetting.options.map((template) => (
            <option key={"Select_" + template}>{template}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ViewSelectField;
