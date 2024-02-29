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
      <button
        onClick={() => navigate("/account")}
        className="md:absolute md:right-[28%] xl:right-[17%] lg:right-[20%] ml-auto bg-box px-2 py-2 rounded-full z-10"
      >
        <QrCodeIcon className="h-6 w-6 text-white" />
      </button>
      <div className="ms-auto relative">
        <Popover>
          <PopoverTrigger>
            <HeaderAccount
              icon={icon}
              user={userAtomLoadable.contents.firstName}
            ></HeaderAccount>
          </PopoverTrigger>
          <PopoverContent>
            <HeaderPopover
              friendsReq={userAtomLoadable.contents.friendRequestsLength}
            ></HeaderPopover>
          </PopoverContent>
        </Popover>
        {userAtomLoadable.contents.friendRequestsLength > 0 && (
          <div className="bg-[#b73a3a] absolute h-3 w-3 rounded-full top-[2px] -left-[3px]"></div>
        )}
      </div>
    </div>
  );
}
