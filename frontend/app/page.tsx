"use client"

import React, {useState, useEffect} from "react"
import {detectHost} from "./api"
import PulseLoader from "react-spinners/PulseLoader"
import NavBarLayout from "./_components/Navigation/NavBarLayout";
import {BaseSettings, SETTING_DB_KEY, SettingsConfiguration} from "@/app/_components/types/settings";
import {HealthPayload} from "@/app/_components/types/console";
import {RAGResponse, RAGConfig} from "@/app/_components/types/rag";
import Footer from "@/app/_components/Navigation/Footer";

export default function Home() {
    const [production, setProduction] = useState(false)

    // Settings
    const [baseSetting, setBaseSetting] = useState<SettingsConfiguration | null>(null)

    // RAG Config
    const [RAGConfig, setRAGConfig] = useState<RAGConfig | null>(null)
    const [APIHost, setAPIHost] = useState<string | null>(null)
    const [currentTheme, setCurrentTheme] = useState("light")

    const fetchHost = async () => {
        try {
            const host = await detectHost()
            setAPIHost(host)
            if (host) {
                try {
                    const health_response = await fetch(host + "/api/health", {method: "GET"})
                    const health_data: HealthPayload = await health_response.json()

                    if (health_data) {
                        setProduction(health_data.production);
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
                            setBaseSetting(data.data[SETTING_DB_KEY].themes);
                            setCurrentTheme(data.data[SETTING_DB_KEY].selectedTheme);
                        } else {
                            setBaseSetting(BaseSettings);
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
        } catch (error) {
            console.error("Failed to update config:", error);
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
                    {/*{currentPage === "CHAT" && (*/}
                    {/*    <ChatComponent*/}
                    {/*        production={production}*/}
                    {/*        settingConfig={baseSetting[settingTemplate]}*/}
                    {/*        APIHost={APIHost}*/}
                    {/*        RAGConfig={RAGConfig}*/}
                    {/*        setCurrentPage={setCurrentPage}*/}
                    {/*    />*/}
                    {/*)}*/}

                    {/*{currentPage === "DOCUMENTS" && (*/}
                    {/*    <DocumentViewerComponent*/}
                    {/*        RAGConfig={RAGConfig}*/}
                    {/*        production={production}*/}
                    {/*        setCurrentPage={setCurrentPage}*/}
                    {/*        settingConfig={baseSetting[settingTemplate]}*/}
                    {/*        APIHost={APIHost}*/}
                    {/*    />*/}
                    {/*)}*/}

                    {/*{currentPage === "STATUS" && !production && (*/}
                    {/*    <StatusComponent*/}
                    {/*        fetchHost={fetchHost}*/}
                    {/*        settingConfig={baseSetting[settingTemplate]}*/}
                    {/*        APIHost={APIHost}*/}
                    {/*    />*/}
                    {/*)}*/}

                    {/*{currentPage === "ADD" && !production && (*/}
                    {/*    <RAGComponent*/}
                    {/*        baseSetting={baseSetting}*/}
                    {/*        settingTemplate={settingTemplate}*/}
                    {/*        buttonTitle="Import"*/}
                    {/*        settingConfig={baseSetting[settingTemplate]}*/}
                    {/*        APIHost={APIHost}*/}
                    {/*        RAGConfig={RAGConfig}*/}
                    {/*        setRAGConfig={setRAGConfig}*/}
                    {/*        setCurrentPage={setCurrentPage}*/}
                    {/*        showComponents={["Reader", "Chunker", "Embedder"]}*/}
                    {/*    />*/}
                    {/*)}*/}

                    {/*{currentPage === "RAG" && !production && (*/}
                    {/*    <RAGComponent*/}
                    {/*        baseSetting={baseSetting}*/}
                    {/*        settingTemplate={settingTemplate}*/}
                    {/*        buttonTitle="Save"*/}
                    {/*        settingConfig={baseSetting[settingTemplate]}*/}
                    {/*        APIHost={APIHost}*/}
                    {/*        RAGConfig={RAGConfig}*/}
                    {/*        setRAGConfig={setRAGConfig}*/}
                    {/*        setCurrentPage={setCurrentPage}*/}
                    {/*        showComponents={["Embedder", "Retriever", "Generator"]}*/}
                    {/*    />*/}
                    {/*)}*/}

                    {/*{currentPage === "SETTINGS" && !production && (*/}
                    {/*    <SettingsComponent*/}
                    {/*        settingTemplate={settingTemplate}*/}
                    {/*        setSettingTemplate={setSettingTemplate}*/}
                    {/*        baseSetting={baseSetting}*/}
                    {/*        setBaseSetting={setBaseSetting}*/}
                    {/*    />*/}
                    {/*)}*/}
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-screen gap-2">
                    <span className="loading loading-bars loading-lg"></span>
                    <p>Loading app</p>
                </div>
            )}
            <Footer/>
        </div>
    );
}
