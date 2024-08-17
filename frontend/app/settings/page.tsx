"use client"
import React, {useEffect, useState} from "react";
import NavBarLayout from "../_components/Navigation/NavBarLayout";
import {FaRegEdit} from "react-icons/fa";
import {BsInfoCircle} from "react-icons/bs";
import {MdOutlineBookmarks} from "react-icons/md";
import { BsTerminal } from "react-icons/bs";
import {detectHost} from "@/app/api";
import {BaseSettings, Settings} from "@/app/_components/Settings/types";
import ViewConsoleAdmin from "@/app/_components/ConsoleAdmin";
import {HealthPayload} from "@/app/_components/ConsoleAdmin/types";
import {RAGConfig, RAGResponse} from "@/app/_components/RAG/types";
import Footer from "@/app/_components/Navigation/Footer";

const Page = () => {
    const tabKey = [{title: 'General', icon: <FaRegEdit/>}, {
        title: 'Workspace',
        icon: <MdOutlineBookmarks/>
    }, {title: 'Console Admin', icon: <BsTerminal/>},];
    const [selectedTab, setSelectedTab] = useState(0);

    const [APIHost, setAPIHost] = useState<string | null>(null)
    const [baseSetting, setBaseSetting] = useState<Settings | null>(null)
    const [production, setProduction] = useState(false)
    const [gtag, setGtag] = useState("")
    const [RAGConfig, setRAGConfig] = useState<RAGConfig | null>(null)
    const [settingTemplate, setSettingTemplate] = useState("Default")

    const fetchHost = async () => {
        try {
            const host = await detectHost()
            console.log(host)
            setAPIHost(host)
            if (host) {
                try {
                    const health_response = await fetch(host + "/api/health", {method: "GET"})
                    const health_data: HealthPayload = await health_response.json()

                    if (health_data) {
                        setProduction(health_data.production);
                        setGtag(health_data.gtag);
                    } else {
                        console.warn("Could not retrieve health data");
                    }

                    const response = await fetch(host + "/api/config", {method: "GET"})
                    const data: RAGResponse = await response.json()

                    if (data) {
                        if (data.error)
                            console.error(data.error)

                        if (data.data.RAG)
                            setRAGConfig(data.data.RAG)

                        if (data.data.SETTING.themes) {
                            setBaseSetting(data.data.SETTING.themes);
                            setSettingTemplate(data.data.SETTING.selectedTheme)
                        } else {
                            setBaseSetting(BaseSettings)
                            setSettingTemplate("Default")
                        }
                    } else {
                        console.warn("Configuration could not be retrieved")
                    }
                } catch (error) {
                    console.error("Failed to fetch configuration:", error)
                    setRAGConfig(null)
                }
            }
        } catch (error) {
            console.error("Error detecting host:", error)
            setAPIHost(null); // Optionally handle the error by setting the state to an empty string or a specific error message
        }
    }
    useEffect(() => {
        fetchHost().then();
    }, []);
    useEffect(() => {
        if (baseSetting) {
            document.documentElement.style.setProperty("--primary-verba", baseSetting[settingTemplate].Customization.settings.primary_color.color)
            document.documentElement.style.setProperty("--secondary-verba", baseSetting[settingTemplate].Customization.settings.secondary_color.color)
            document.documentElement.style.setProperty("--warning-verba", baseSetting[settingTemplate].Customization.settings.warning_color.color)
            document.documentElement.style.setProperty("--bg-verba", baseSetting[settingTemplate].Customization.settings.bg_color.color)
            document.documentElement.style.setProperty("--bg-alt-verba", baseSetting[settingTemplate].Customization.settings.bg_alt_color.color)
            document.documentElement.style.setProperty("--text-verba", baseSetting[settingTemplate].Customization.settings.text_color.color)
            document.documentElement.style.setProperty("--text-alt-verba", baseSetting[settingTemplate].Customization.settings.text_alt_color.color)
            document.documentElement.style.setProperty("--button-verba", baseSetting[settingTemplate].Customization.settings.button_color.color)
            document.documentElement.style.setProperty("--button-hover-verba", baseSetting[settingTemplate].Customization.settings.button_hover_color.color)
            document.documentElement.style.setProperty("--bg-console-verba", baseSetting[settingTemplate].Customization.settings.bg_console.color)
            document.documentElement.style.setProperty("--text-console-verba", baseSetting[settingTemplate].Customization.settings.text_console.color)
        }
    }, [baseSetting, settingTemplate]);

    const tab_general = () => {
        return (<>
            General
        </>);
    }

    const tab_workspace = () => {
        return (<>
            Workspace
        </>);
    }

    const TabView = () => {
        if (selectedTab === 0) {
            return(tab_general());
        } else if (selectedTab === 1) {
            return(tab_workspace());
        } else {
            if (baseSetting) {
                return(
                <ViewConsoleAdmin fetchHost={fetchHost}
                            settingConfig={baseSetting[settingTemplate]}
                            APIHost={APIHost}/>);
            }
        }
    }

    return (
        <div data-theme={'dark'} className={'flex flex-col h-screen overflow-auto'}>
            <NavBarLayout imageSrc={''}
                          title={''}
                          subtitle={''}/>
            <div className="grid grid-cols-[180px_auto] p-2 flex-grow">
                <div className="tabs flex flex-col text-xs text-left gap-y-1">
                    {
                        tabKey.map((item, index) => (
                            <div key={item.title} className={'w-full'}>
                                <button
                                    className={`w-full justify-start btn ${selectedTab === index ? 'btn-sm btn-active' : 'btn-sm'}`}
                                    onClick={() => setSelectedTab(index)}
                                >
                                    <div className=" self-center mr-2">
                                        {tabKey[index].icon}
                                    </div>
                                    <div className=" self-center">{tabKey[index].title}</div>
                                </button>
                            </div>
                        ))
                    }
                </div>

                <div className="overflow-y-auto px-2">
                    <TabView/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Page