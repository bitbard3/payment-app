import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FormIcon({ icon, px, py }) {
  return (
    <button className="">
      <div
        className={`rounded-full border border-light  px-${px} py-${py} hover:scale-110 duration-200`}
      >
        <FontAwesomeIcon icon={icon} className="  text-light" />
      </div>
    </button>
  );
}
