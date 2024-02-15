import React from "react";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Gradients from "../components/Gradients";
import NavItemsList from "../components/NavItemsList";
import { sideBarOpen } from "../stores/atom/sideBar";
import { useRecoilValue } from "recoil";
import SendMoney from "../components/SendMoney";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function Payment() {
  const userList = [
    { firstName: "Ansh", lastName: "Arora" },
    { firstName: "Chirag", lastName: "Lalwani" },
    { firstName: "Jalaj", lastName: "Daga" },
    { firstName: "Harkirat", lastName: "Singh" },
    { firstName: "Ansh", lastName: "Arora" },
    { firstName: "Ansh", lastName: "Arora" },
    { firstName: "Ansh", lastName: "Arora" },
    { firstName: "Ansh", lastName: "Arora" },
  ];
  const sideBar = useRecoilValue(sideBarOpen);

  return (
    <div>
      <div className="w-screen h-screen bg-dark grid grid-cols-12 grid-rows-9 relative overflow-hidden">
        <div
          className={`col-span-2 bg-box bg-opacity-40 row-span-9 hidden ${
            !sideBar ? `hidden` : `xl:block `
          }`}
        >
          <div className="flex flex-col gap-10 h-full">
            <NavItemsList></NavItemsList>
          </div>
        </div>
        <div
          className={`row-span-1 col-span-12  bg-box bg-opacity-30 ${
            !sideBar ? ` col-span-12` : `xl:col-span-10`
          }`}
        >
          <Header
            text={"Payment"}
            icon={<HomeIcon className="text-neutral-300 h-5 md:h-6"></HomeIcon>}
            buttonText={"Ansh"}
          ></Header>
        </div>
        <div
          className={`row-span-8 mt-10 bg-box bg-opacity-35 md:mx-10 xl:mx-0 md:rounded-2xl mb-5 flex flex-col items-center justify-center ${
            !sideBar
              ? `xl:col-start-2 col-span-12 xl:col-span-10`
              : `xl:col-start-4 xl:col-span-8 col-span-12`
          }`}
        >
          <SendMoney users={userList}></SendMoney>
        </div>

        <MobileNav></MobileNav>
        <Gradients></Gradients>
      </div>
    </div>
  );
}
