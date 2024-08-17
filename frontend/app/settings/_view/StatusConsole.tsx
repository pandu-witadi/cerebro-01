"use client";
import React from "react";
import StatusCard from "./StatusCard";
import {Status} from "@/app/_components/types/console";

interface StatusConsoleComponentProps {
  title: string;
  status: Status | null;
  isFetching: boolean;
}

const StatusConsole: React.FC<StatusConsoleComponentProps> = ({
  title,
  status,
  isFetching,
}) => {
  return (
      <div className="flex flex-col gap-2">
        <div className="card shadow-xl p-3 glass">
          <div className="card-title mb-2">{title}</div>

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

export default StatusConsole;
