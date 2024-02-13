import React from "react";
import HeaderHeading from "./HeaderHeading";
import HeaderAccount from "./HeaderAccount";

export default function Header({ icon, user, text }) {
  return (
    <div className="flex h-full items-center md:px-16 px-5 w-full">
      <HeaderHeading text={text}></HeaderHeading>
      <div className="ms-auto">
        <HeaderAccount icon={icon} user={user}></HeaderAccount>
      </div>
    </div>
  );
}
