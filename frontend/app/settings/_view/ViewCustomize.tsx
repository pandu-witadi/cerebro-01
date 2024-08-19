import React, {useState} from "react";
import {BaseSettings, SettingsConfiguration} from "@/app/_components/types/settings";
import {RenderForm} from "@/app/_components/view/RenderForm";
import {FaCheckCircle} from "react-icons/fa";
import {MdCancel} from "react-icons/md";

interface CustomizeProps {
    baseSetting: SettingsConfiguration;
    setBaseSetting: (b: any) => void;
    onSyncData: (b: any) => void
}

const ViewCustomize: React.FC<CustomizeProps> = ({baseSetting, setBaseSetting, onSyncData}) => {
    const keyVarCustomization = 'Custom';
    const keyVarChat = 'Chat';

    const [currentSettingsConfig, setCurrentSettingsConfig] =
        useState<SettingsConfiguration>(
            JSON.parse(JSON.stringify(baseSetting))
        );

    const applyChanges = () => {
        setBaseSetting(currentSettingsConfig);
        onSyncData(true);
    };

    const revertChanges = () => {
        setBaseSetting(JSON.parse(JSON.stringify(BaseSettings)));
        onSyncData(true);
    };

    return (
        <>
            <div className="w-full justify-start items-start gap-3 pb-2">
                <div className="card shadow-xl p-3 glass">
                    <div className="card-title">
                        {BaseSettings[keyVarCustomization] ? BaseSettings[keyVarCustomization].title : ""}
                    </div>
                    <div
                        className={'text-sm'}>{BaseSettings[keyVarCustomization] ? BaseSettings[keyVarCustomization].description : ""}
                    </div>

                    <div className="flex-coll gap-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2">
                        {Object.entries(
                            BaseSettings[keyVarCustomization].settings
                        ).map(([key, settingValue]) =>
                            <div key={key}>
                                {RenderForm(keyVarCustomization, key, settingValue, currentSettingsConfig, setCurrentSettingsConfig)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full justify-start items-start gap-3 pb-2">
                <div className="card shadow-xl p-3 glass">
                    <div className="card-title">
                        {BaseSettings[keyVarChat] ? BaseSettings[keyVarChat].title : ""}
                    </div>
                    <div className={'text-sm'}>{BaseSettings[keyVarChat] ? BaseSettings[keyVarChat].description : ""}</div>

                    <div className="flex-coll gap-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2">
                        {Object.entries(
                            BaseSettings[keyVarChat].settings
                        ).map(([key, settingValue]) =>
                            <div key={key}>
                                {RenderForm(keyVarChat, key, settingValue, currentSettingsConfig, setCurrentSettingsConfig)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <button
                    onClick={applyChanges}
                    className="btn btn-sm btn-success"
                >
                    <FaCheckCircle/>
                    <p className="">Apply</p>
                </button>
                <button
                    onClick={revertChanges}
                    className="btn btn-sm btn-error"
                >
                    <MdCancel/>
                    <p className="">Reset</p>
                </button>
            </div>
        </>
    );

}
export default ViewCustomize;