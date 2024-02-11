import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function NavItems({ icon, text }) {
  return (
    <button className="z-10">
      <div
        className="flex items-center gap-3.5 pl-3 active:bg-primary active:bg-opacity-10 active:border-r-primary active:border-r-[4px] 
      py-2 text-neutral-400 opacity-60 active:opacity-100 hover:bg-neutral-400 hover:bg-opacity-10 delay-75 active:text-primary"
      >
        <FontAwesomeIcon icon={icon} className="" />
        <span className=" pt-[3.5px] font-medium">{text}</span>
      </div>
    </button>
  );
}
