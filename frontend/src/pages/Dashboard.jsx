import React from "react";
import {
  faHouse,
  faWallet,
  faUser,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import NavItemsList from "../components/NavItemsList";
import Card from "../components/Card";
import Money from "../components/Money";
import Header from "../components/Header";
import { useRecoilValue } from "recoil";
import { sideBarOpen } from "../stores/atom/sideBar";
const navitems = [
  { icon: faHouse, text: "Dashboard" },
  { icon: faMoneyBill, text: "Send Money" },
  { icon: faWallet, text: "Transactions" },
  { icon: faUser, text: "Account" },
];
const cardItems = [
  { heading: "Balance", value: "1000" },
  { heading: "Transactions", value: "23" },
  { heading: "Friends", value: "473" },
];
const userList = [
  { firstName: "Ansh", lastName: "Arora" },
  { firstName: "Chirag", lastName: "Lalwani" },
  { firstName: "Jalaj", lastName: "Daga" },
  { firstName: "Harkirat", lastName: "Singh" },
];
export default function Dashboard() {
  const sideBar = useRecoilValue(sideBarOpen);
  return (
    <div>
      <div className="bg-dark h-screen w-screen grid grid-rows-9 grid-cols-12 relative overflow-hidden">
        <div
          className={`col-span-2 bg-box bg-opacity-40 row-span-10 hidden ${
            !sideBar ? `xl:block` : `hidden`
          }`}
        >
          <div className="flex flex-col px-3 gap-10 h-full">
            <NavItemsList navItems={navitems}></NavItemsList>
          </div>
        </div>
        <div
          className={`row-span-1 col-span-12  bg-box bg-opacity-30 ${
            !sideBar ? `xl:col-span-10` : `col-span-12`
          }`}
        >
          <Header
            icon={faUserRegular}
            text={"Dashboard"}
            user={"Ansh"}
          ></Header>
        </div>
        <div
          className={`col-span-12 bg-box bg-opacity-45 row-span-3 mt-10 lg:mx-10 md:rounded-2xl ${
            !sideBar ? `xl:col-span-10` : `col-span-12`
          }`}
        >
          <Card items={cardItems}></Card>
        </div>

        <div
          className={` col-span-12 row-span-5 mt-10 bg-box bg-opacity-45 md:rounded-2xl lg:mx-10 mb-5 ${
            !sideBar ? `xl:col-span-10` : `col-span-12`
          }`}
        >
          <Money users={userList}></Money>
        </div>

        <div className="absolute h-1/3 blur-[500px] bg-opacity-35  w-1/5 bg-primary"></div>
        <div className="absolute h-1/6 blur-[500px] bg-opacity-35  -bottom-10 w-1/5 bg-primary"></div>
        <div className="absolute h-1/3  blur-[500px] bg-opacity-30  w-1/5 bg-secondary left-[40%] -top-20"></div>
        <div className="absolute h-1/3  blur-[500px] bg-opacity-20  w-1/5 bg-secondary left-[30%] -bottom-52"></div>
        <div className="absolute h-1/3  blur-[500px] bg-opacity-30 w-1/5 bg-secondary -right-20 top-[40%]"></div>
      </div>
    </div>
  );
}
