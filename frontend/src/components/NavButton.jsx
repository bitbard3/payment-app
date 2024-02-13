import React from "react";
import { useRecoilState } from "recoil";
import { sideBarOpen } from "../stores/atom/sideBar";

export default function NavButton() {
  const [sideBar, setSidebar] = useRecoilState(sideBarOpen);
  return (
    <button
      onClick={() => setSidebar((p) => !p)}
      className="flex flex-col justify-center items-center gap-0.5"
    >
      <span
        className={`dark:bg-white bg-light block transition-all duration-500 ease-out  h-[2px] w-8 rounded-sm ${
          !sideBar ? " -translate-y-1" : "rotate-45 translate-y-1.5"
        }`}
      ></span>
      <span
        className={`dark:bg-white bg-light block transition-all duration-500 ease-out 
                    h-[2px] w-8 rounded-sm my-0.5 ${
                      !sideBar ? "opacity-100" : "opacity-0"
                    }`}
      ></span>
      <span
        className={`dark:bg-white bg-light block transition-all duration-500 ease-out 
                    h-[2px] w-8 rounded-sm ${
                      !sideBar
                        ? " translate-y-1"
                        : "-rotate-45 -translate-y-1.5"
                    }`}
      ></span>
    </button>
  );
}
