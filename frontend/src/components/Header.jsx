import React from "react";
import HeaderHeading from "./HeaderHeading";
import HeaderAccount from "./HeaderAccount";
import NavButton from "./NavButton";
import { useRecoilValueLoadable } from "recoil";
import { user } from "@/stores/atom/user";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import HeaderPopover from "./HeaderPopover";
export default function Header({ icon, text }) {
  const navigate = useNavigate();
  const userAtomLoadable = useRecoilValueLoadable(user);
  return (
    <div className="flex h-full items-center md:px-16 px-5 w-full relative">
      <span className="mr-5 z-50">
        <NavButton></NavButton>
      </span>
      <HeaderHeading text={text}></HeaderHeading>
      <div className="ms-auto flex items-center justify-center relative">
        <button
          onClick={() => navigate("/account")}
          className="bg-box px-2 py-2 rounded-full z-10 mr-3"
        >
          <QrCodeIcon className="h-6 w-6 text-white" />
        </button>
        <Popover>
          <PopoverTrigger>
            <HeaderAccount
              icon={icon}
              user={
                userAtomLoadable.state === "loading"
                  ? null
                  : userAtomLoadable.contents.firstName
              }
            ></HeaderAccount>
          </PopoverTrigger>
          <PopoverContent>
            <HeaderPopover
              friendsReq={
                userAtomLoadable.state === "hasValue" &&
                userAtomLoadable.contents.friendRequestsLength
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
