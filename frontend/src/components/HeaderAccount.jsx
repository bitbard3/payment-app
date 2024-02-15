import React from "react";
export default function HeaderAccount({ user, icon }) {
  return (
    <div className="rounded-lg flex items-center gap-3 bg-box bg-opacity-60 px-6 py-2">
      {icon}
      <span className="text-light font-medium text-sm md:text-base">
        {user}
      </span>
    </div>
  );
}
