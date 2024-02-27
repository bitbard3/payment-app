import React from "react";
import NavItemsList from "../components/NavItemsList";
import Card from "../components/Card";
import Money from "../components/Money";
import Header from "../components/Header";
import { useRecoilValue } from "recoil";
import { sideBarOpen } from "../stores/atom/sideBar";
import MobileNav from "../components/MobileNav";
import Gradients from "../components/Gradients";
import { UserIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const sideBar = useRecoilValue(sideBarOpen);
  return (
    <div>
      <div className="bg-dark h-screen w-screen grid grid-rows-9 grid-cols-12 relative overflow-hidden">
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
            text={"Dashboard"}
            icon={<UserIcon className="text-neutral-300 h-5 md:h-6"></UserIcon>}
          ></Header>
        </div>
        <div
          className={`col-span-12 bg-box bg-opacity-45 row-span-3 mt-10 lg:mx-10 md:rounded-2xl ${
            !sideBar ? ` col-span-12` : `xl:col-span-10`
          }`}
        >
          {}
          <Card></Card>
        </div>

        <div
          className={` col-span-12 row-span-5 mt-10 bg-box bg-opacity-45 md:rounded-2xl lg:mx-10 mb-5 ${
            !sideBar ? ` col-span-12` : `xl:col-span-10`
          }`}
        >
          <Money></Money>
        </div>

        <Gradients></Gradients>
        <MobileNav></MobileNav>
      </div>
    </div>
  );
}
