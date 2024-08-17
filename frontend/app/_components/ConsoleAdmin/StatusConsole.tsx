"use client";
import React from "react";
import { Status } from "./types";
import StatusCard from "./StatusCard";

interface StatusConsoleComponentProps {
  title: string;
  status: Status | null;
  isFetching: boolean;
}

const StatusConsoleComponent: React.FC<StatusConsoleComponentProps> = ({
  title,
  status,
  isFetching,
}) => {
  return (
      <div className="flex flex-col gap-2">
        <div className="card bg-base-200 shadow-xl p-3 glass">
          <h2 className="card-title mb-2">{title}</h2>

          {isFetching && (
              <div className="flex items-center justify-center pl-4 mb-4 gap-3">
                  <span className="loading loading-bars loading-lg"></span>
                  <div>Loading Stats</div>
              </div>
          )}

            <div className="flex flex-col gap-2 w-full">
            {status &&
                Object.entries(status).map(([key, value]) => (
                    <StatusCard
                        key={"Status_" + key}
                        title={key}
                        value={null}
                        checked={value}
                    />
                ))}
          </div>
        </div>
      </div>
  );
};

export default StatusConsoleComponent;
