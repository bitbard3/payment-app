import React from "react";
import NavItemsList from "./NavItemsList";
import { useRecoilValue } from "recoil";
import { sideBarOpen } from "../stores/atom/sideBar";
export default function MobileNav() {
  const sideBar = useRecoilValue(sideBarOpen);
  return (
    <div
      className={`absolute h-full xl:hidden bg-[#121229] w-1/2 lg:w-1/3 ${
        !sideBar ? `hidden` : ``
      }`}
    >
      <NavItemsList></NavItemsList>
    </div>
  );
}
