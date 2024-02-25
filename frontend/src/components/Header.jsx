import React from "react";
import HeaderHeading from "./HeaderHeading";
import HeaderAccount from "./HeaderAccount";
import NavButton from "./NavButton";
import { useRecoilValueLoadable } from "recoil";
import { user } from "@/stores/atom/user";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import HeaderPopover from "./HeaderPopover";

export default function Header({ icon, text }) {
  const userAtomLoadable = useRecoilValueLoadable(user);
  return (
    <div className="flex h-full items-center md:px-16 px-5 w-full">
      <span className="mr-5 z-50">
        <NavButton></NavButton>
      </span>
      <HeaderHeading text={text}></HeaderHeading>
      <div className="ms-auto">
        <Popover>
          <PopoverTrigger>
            <HeaderAccount
              icon={icon}
              user={
                text == "Account" ? `Home` : userAtomLoadable.contents.firstName
              }
            ></HeaderAccount>
          </PopoverTrigger>
          <PopoverContent>
            <HeaderPopover></HeaderPopover>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
