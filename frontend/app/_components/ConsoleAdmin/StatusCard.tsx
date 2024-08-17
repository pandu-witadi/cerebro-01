"use client";

import React from "react";

interface StatusCardProps {
  title: string;
  value: number | null;
  checked: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, checked }) => {
  return (
    <div className={`flex p-1 rounded-lg ${checked ? "bg-accent" : "bg-base-300"}`}>
      <div className="flex gap-2 items-center w-full px-1">
        <div className={`flex-grow text-sm truncate mr-3 ${checked ? 'text-accent-content' : 'text-base-content'}`}>{title}</div>
        <div className={`text-xs ${checked ? 'text-accent-content' : 'text-base-content'}`}>
          {value !== null ? (
            <p>{value}</p>
          ) : (
            <p>{checked ? "Available" : "Not Available"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
