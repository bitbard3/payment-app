import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function HeaderAccount({ user, icon }) {
  return (
    <div className="rounded-lg flex items-center gap-3 bg-box bg-opacity-60 px-6 py-2">
      <FontAwesomeIcon icon={icon} className="text-neutral-300" />
      <span className="text-light font-medium">{user}</span>
    </div>
  );
}
