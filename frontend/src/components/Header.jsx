import React from "react";
import HeaderHeading from "./HeaderHeading";
import HeaderAccount from "./HeaderAccount";
import NavButton from "./NavButton";
import { useRecoilValue } from "recoil";
import { user } from "@/stores/atom/user";
export default function Header({ icon, text }) {
  const userAtom = useRecoilValue(user);
  const userfirstName = userAtom.firstName;
  return (
    <div className="flex h-full items-center md:px-16 px-5 w-full">
      <span className="mr-5 z-10">
        <NavButton></NavButton>
      </span>
      <HeaderHeading text={text}></HeaderHeading>
      <div className="ms-auto">
        <HeaderAccount icon={icon} user={userfirstName}></HeaderAccount>
      </div>
    </div>
  );
}
