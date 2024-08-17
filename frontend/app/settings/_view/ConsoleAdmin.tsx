"use client";
import React from "react";
import StatusCard from "./StatusCard";
import UserModalComponent from "@/app/_components/view/UserModal";
import {SchemaStatus} from "@/app/_components/types/console";

interface AdminConsoleComponentProps {
    type: string | null;
    connected: string;
    schemas: SchemaStatus | null;
    isFetching: boolean;
    reset_verba: (m: string) => void;
}

const ConsoleAdmin: React.FC<AdminConsoleComponentProps> = ({
                                                                         type,
                                                                         connected,
                                                                         isFetching,
                                                                         schemas,
                                                                         reset_verba,
                                                                     }) => {
    const openResetVerba = () => {
        const modal = document.getElementById("reset_verba_modal");
        if (modal instanceof HTMLDialogElement) {
            modal.showModal();
        }
    };

    const openResetDocuments = () => {
        const modal = document.getElementById("reset_documents_modal");
        if (modal instanceof HTMLDialogElement) {
            modal.showModal();
        }
    };

    const openResetCache = () => {
        const modal = document.getElementById("reset_cache_modal");
        if (modal instanceof HTMLDialogElement) {
            modal.showModal();
        }
    };

    const openResetSuggestions = () => {
        const modal = document.getElementById("reset_suggestions_modal");
        if (modal instanceof HTMLDialogElement) {
            modal.showModal();
        }
    };

    const openConfigSuggestions = () => {
        const modal = document.getElementById("reset_config_modal");
        if (modal instanceof HTMLDialogElement) {
            modal.showModal();
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="card bg-base-200 shadow-xl p-3 glass">
                <div className="card-title mb-2">Admin Console</div>

                {isFetching && (
                    <div className="flex items-center justify-center pl-4 mb-4 gap-3">
                        <span className="loading loading-bars loading-lg"></span>
                        <div>Loading Stats</div>
                    </div>
                )}

                {connected === "Online" && (
                    <div className="gap-2 grid grid-cols-2 mb-2">
                        <button onClick={openResetVerba} className="btn btn-sm btn-primary">
                            <div>Reset App</div>
                        </button>
                        <button onClick={openResetDocuments} className="btn btn-sm btn-secondary">
                            <div>Reset Documents</div>
                        </button>
                        <button onClick={openResetCache} className="btn btn-sm btn-info">
                            <div>Reset Cache</div>
                        </button>
                        <button onClick={openResetSuggestions} className="btn btn-sm btn-warning">
                            <div>Reset Suggestion</div>
                        </button>
                        <button onClick={openConfigSuggestions} className="btn btn-sm btn-error">
                            <div>Reset Config</div>
                        </button>
                    </div>
                )}

                <div className="flex flex-col gap-2 w-full">
                    {schemas &&
                        Object.entries(schemas).map(([key, value]) => (
                            <StatusCard
                                key={key + "SCHEMA"}
                                title={key}
                                value={value}
                                checked={false}
                            />
                        ))}
                </div>
            </div>

            <UserModalComponent
                modal_id="reset_verba_modal"
                title="Reset App"
                text={"Do you want to delete all data App data?"}
                triggerString="Reset"
                triggerValue="VERBA"
                triggerAccept={reset_verba}
            />
            <UserModalComponent
                modal_id="reset_documents_modal"
                title="Reset Documents"
                text={"Do you want to delete all documents?"}
                triggerString="Reset"
                triggerValue="DOCUMENTS"
                triggerAccept={reset_verba}
            />
            <UserModalComponent
                modal_id="reset_cache_modal"
                title="Reset Cache"
                text={"Do you want to delete all cached data?"}
                triggerString="Reset"
                triggerValue="CACHE"
                triggerAccept={reset_verba}
            />
            <UserModalComponent
                modal_id="reset_suggestions_modal"
                title="Reset Suggestions"
                text={"Do you want to delete all autocompletion suggestions?"}
                triggerString="Reset"
                triggerValue="SUGGESTIONS"
                triggerAccept={reset_verba}
            />
            <UserModalComponent
                modal_id="reset_config_modal"
                title="Reset Configuration"
                text={"Do you want to reset your configuration?"}
                triggerString="Reset"
                triggerValue="CONFIG"
                triggerAccept={reset_verba}
            />
        </div>
    );
};

export default ConsoleAdmin;
