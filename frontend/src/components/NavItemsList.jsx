import React from "react";
import NavItems from "./NavItems";
import {
  faHouse,
  faWallet,
  faUser,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

export default function () {
  return (
    <div className="flex flex-col py-40 gap-10">
      <NavItems
        icon={faHouse}
        text={"Dashboard"}
        navlink={"/dashboard"}
      ></NavItems>
      <NavItems
        icon={faMoneyBill}
        text={"Send money"}
        navlink={"/payment"}
      ></NavItems>
      <NavItems
        icon={faWallet}
        text={"Transactions"}
        navlink={"/transactions"}
      ></NavItems>
      <NavItems icon={faUser} text={"Account"} navlink={"/account"}></NavItems>
    </div>
  );
}
