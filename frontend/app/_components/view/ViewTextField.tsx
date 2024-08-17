"use client";

import React from "react";
import {KeySettingConfiguration, SettingsConfiguration, TextFieldSetting} from "@/app/_components/types/settings";

interface TextFieldComponentProps {
    settings: KeySettingConfiguration,
    title: string;
    TextFieldSetting: TextFieldSetting;
    settingsConfig: SettingsConfiguration;
    setSettingsConfig: (settings: any) => void;
}

const ViewTextField: React.FC<TextFieldComponentProps> = ({
                                                                   settings,
                                                                   title,
                                                                   TextFieldSetting,
                                                                   settingsConfig,
                                                                   setSettingsConfig,
                                                               }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setSettingsConfig((prevConfig: any) => {
            // Creating a deep copy of prevConfig to avoid mutating the original state directly
            const newConfig = JSON.parse(JSON.stringify(prevConfig));

            // Updating the copied state
            newConfig[settings].settings[title].text = newText;

            // Return the updated copy
            return newConfig;
        });
    };

    return (
        <div key={title} className="flex flex-col gap-1">
            <div className="flex items-center justify-start">
                <p>{TextFieldSetting.description}</p>
            </div>
            <div className="flex items-center justify-center">
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <input
                        type="text"
                        className="grow"
                        placeholder={title}
                        value={(settingsConfig[settings].settings as any)[title].text}
                        onChange={handleChange}
                    />
                </label>
            </div>
        </div>
    );
};

export default ViewTextField;
