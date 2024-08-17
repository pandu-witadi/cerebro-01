import React from "react";
import {
    CheckboxSetting,
    ImageFieldSetting, NumberFieldSetting,
    SelectSetting, SettingsConfiguration,
    TextFieldSetting
} from "@/app/_components/types/settings";
import ViewTextField from "@/app/_components/view/ViewTextField";
import ViewImageField from "@/app/_components/view/ViewImageField";
import ViewSelectField from "@/app/_components/view/ViewSelectField";

export function RenderForm(settings: 'Custom', title: any,
                           setting_type:
                               | TextFieldSetting
                               | ImageFieldSetting
                               | CheckboxSetting
                               | SelectSetting
                               | NumberFieldSetting,
                           currentSettingsConfig: SettingsConfiguration,
                           setCurrentSettingsConfig: (settings: any) => void,
) {

    const renderItem = () => {
        switch (setting_type.type) {
            case "text":
                return (
                    <ViewTextField
                        settings={settings}
                        title={title}
                        TextFieldSetting={setting_type}
                        settingsConfig={currentSettingsConfig}
                        setSettingsConfig={setCurrentSettingsConfig}
                    />
                );
            case "image":
                return (
                    <ViewImageField
                        settings={settings}
                        title={title}
                        ImageFieldSetting={setting_type}
                        settingsConfig={currentSettingsConfig}
                        setSettingsConfig={setCurrentSettingsConfig}
                    />
                );
            // case "check":
            //     return (
            //         <ViewSelectField
            //             title={title}
            //             setting={settings}
            //             CheckboxSetting={setting_type}
            //             settingsConfig={currentSettingsConfig}
            //             setSettingsConfig={setCurrentSettingsConfig}
            //         />
            //     );
            case "select":
                return (
                    <ViewSelectField
                        title={title}
                        setting={settings}
                        SelectSetting={setting_type}
                        settingsConfig={currentSettingsConfig}
                        setSettingsConfig={setCurrentSettingsConfig}
                    />
                );
            // case "number":
            //     return (
            //         <NumberFieldComponent
            //             title={title}
            //             setting={setting}
            //             NumberFieldSetting={setting_type}
            //             settingsConfig={currentSettingsConfig}
            //             setSettingsConfig={setCurrentSettingsConfig}
            //         />
            //     );
            default:
                return null;
        }
    }

    return (
        <div key={title}>
            {renderItem()}
        </div>
    );
}