import React from "react";
import HeaderHeading from "./HeaderHeading";
import HeaderAccount from "./HeaderAccount";
import NavButton from "./NavButton";
import { useRecoilValueLoadable } from "recoil";
import { user } from "@/stores/atom/user";
export default function Header({ icon, text }) {
  const userAtomLoadable = useRecoilValueLoadable(user);
  return (
    <div className="flex h-full items-center md:px-16 px-5 w-full">
      <span className="mr-5 z-10">
        <NavButton></NavButton>
      </span>
      <HeaderHeading text={text}></HeaderHeading>
      <div className="ms-auto">
        <HeaderAccount
          icon={icon}
          user={
            text == "Account" ? `Home` : userAtomLoadable.contents.firstName
          }
        ></HeaderAccount>
      </div>
    </div>
  );
}
