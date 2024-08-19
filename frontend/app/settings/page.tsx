"use client"
import React, {useEffect, useState} from "react";
import NavBarLayout from "../_components/Navigation/NavBarLayout";
import {MdOutlineBookmarks} from "react-icons/md";
import {BsTerminal} from "react-icons/bs";
import {PiPaintBrushHouseholdThin} from "react-icons/pi";
import {detectHost, getOllamaHost} from "@/app/api";
import {BaseSettings, SETTING_DB_KEY, SettingsConfiguration} from "@/app/_components/types/settings";
import {HealthPayload} from "@/app/_components/types/console";
import {RAGConfig, RAGResponse} from "@/app/_components/types/rag";
import Footer from "@/app/_components/Navigation/Footer";
import ViewConsoleAdmin from "@/app/settings/_view/ViewConsoleAdmin";
import ViewCustomize from "@/app/settings/_view/ViewCustomize";
import ViewRag from "@/app/settings/_view/ViewRag";

const Page = () => {
    const tabKey = [{title: 'Customize', icon: <PiPaintBrushHouseholdThin/>},
        {
            title: 'Workspace',
            icon: <MdOutlineBookmarks/>
        }, {title: 'Admin Console', icon: <BsTerminal/>},];
    const [selectedTab, setSelectedTab] = useState(0);

    const [APIHost, setAPIHost] = useState<string | null>(null)
    const [baseSetting, setBaseSetting] = useState<SettingsConfiguration | null>(null)
    const [RAGConfig, setRAGConfig] = useState<RAGConfig | null>(null);
    const [syncData, setSyncData] = useState(false);
    const [currentTheme, setCurrentTheme] = useState("light")

    // async function getModelList() {
    //     const host = await getOllamaHost()
    //
    //     // Fetch data
    //     const resp = await fetch(host + "/api/tags")
    //     let data_ = await resp.json()
    //     let results: string[] = ['']
    //
    //     // Store results in the results array
    //     data_['models'].forEach((value: AiModel) => {
    //         results.push(value.name)
    //     });
    //
    //     if (results === []) {
    //         results.push('llama3');
    //     }
    //
    //     await fetchHost(results);
    // }

    const fetchHost = async () => {
        try {
            const host = await detectHost()
            setAPIHost(host)
            if (host) {
                try {
                    const health_response = await fetch(host + "/api/health", {method: "GET"})
                    const health_data: HealthPayload = await health_response.json()

                    if (health_data) {
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

                        if (data.data[SETTING_DB_KEY].themes) {
                            // data.data[SETTING_DB_KEY].themes.Chat.settings.model.options = models;
                            setBaseSetting(data.data[SETTING_DB_KEY].themes);
                            setCurrentTheme(data.data[SETTING_DB_KEY].selectedTheme);
                        } else {
                            let base_ = BaseSettings;
                            base_.Chat.settings.model.options = models;
                            setBaseSetting(base_);
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

    const importConfig = async () => {
        if (!APIHost || !baseSetting)
            return

        try {
            const theme_ = baseSetting.Custom.settings.theme.value;
            const payload = {
                config: {
                    RAG: RAGConfig,
                    [SETTING_DB_KEY]: {selectedTheme: theme_, themes: baseSetting},
                },
            };

            const response = await fetch(APIHost + "/api/set_config", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            })
            setCurrentTheme(theme_);
        } catch (error) {
            console.error("Failed to update config:", error);
        }
    }

    useEffect(() => {
        fetchHost().then();
    }, []);

    useEffect(() => {
        if (syncData) {
            importConfig().then(() => {
                fetchHost().then(r => setSyncData(false));
            });
        }
    }, [baseSetting]);

    const tab_workspace = () => {
        return (<>
            Workspace
        </>);
    }

    const TabView = ({base}: { base: SettingsConfiguration }) => {
        if (selectedTab === 0) {
            return (
                <ViewCustomize baseSetting={base} setBaseSetting={setBaseSetting}
                               onSyncData={() => setSyncData(true)}/>
            )
        } else if (selectedTab === 1) {
            return (<></>);
        } else {
            return (<ViewConsoleAdmin fetchHost={fetchHost} APIHost={APIHost}/>);
        }
    }

    return (
        <div data-theme={baseSetting ? currentTheme : "light"} className={'flex flex-col h-screen'}>
            {baseSetting ? (
                <>
                    <NavBarLayout imageSrc={baseSetting['Custom'].settings.image.src}
                                  title={baseSetting['Custom'].settings.title.text}
                                  subtitle={baseSetting['Custom'].settings.subtitle.text}/>
                    <div className="grid grid-cols-[200px_auto] p-2 flex-grow  overflow-auto">
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

                        <div className="pl-4 pr-2">
                            <TabView base={baseSetting}/>
                        </div>
                    </div>
                </>) : (
                <div className="flex items-center justify-center h-screen gap-2">
                    <span className="loading loading-bars loading-lg"></span>
                    <p>Loading app</p>
                </div>
            )}

            <Footer/>
        </div>
    )
}
export default Page