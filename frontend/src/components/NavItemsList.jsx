import React from "react";
import NavItems from "./NavItems";
import {
  UserIcon,
  BanknotesIcon,
  HomeIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";

export default function () {
  return (
    <div className="flex flex-col py-40 gap-10">
      <NavItems
        icon={<HomeIcon className="h-6 w-6"></HomeIcon>}
        text={"Dashboard"}
        navlink={"/dashboard"}
      ></NavItems>
      <NavItems
        icon={<BanknotesIcon className="h-6 w-6"></BanknotesIcon>}
        text={"Send money"}
        navlink={"/payment"}
      ></NavItems>
      <NavItems
        icon={<WalletIcon className="h-6 w-6"></WalletIcon>}
        text={"Transactions"}
        navlink={"/transactions"}
      ></NavItems>
      <NavItems
        icon={<UserIcon className="h-6 w-6"></UserIcon>}
        text={"Account"}
        navlink={"/account"}
      ></NavItems>
    </div>
  );
}
