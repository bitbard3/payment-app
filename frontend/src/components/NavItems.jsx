import React from "react";
import { NavLink } from "react-router-dom";
export default function NavItems({ icon, text, navlink }) {
  return (
    <button className="z-10">
      <NavLink to={navlink}>
        <div
          className="flex items-center gap-3.5 xl:px-10 active:bg-yellow active:bg-opacity-10 active:border-r-yellow active:border-r-[4px] 
      py-2 text-neutral-400 opacity-60 active:opacity-100 hover:bg-neutral-400 hover:bg-opacity-10 delay-75 active:text-yellow nav  pl-7 md:pl-[4.3rem]"
        >
          {icon}
          <span className=" pt-[3.5px] font-medium">{text}</span>
        </div>
      </NavLink>
    </button>
  );
}
