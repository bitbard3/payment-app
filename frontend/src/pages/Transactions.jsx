import React from "react";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Gradients from "../components/Gradients";
import NavItemsList from "../components/NavItemsList";
import { sideBarOpen } from "../stores/atom/sideBar";
import { useRecoilValue } from "recoil";
import { UserIcon } from "@heroicons/react/24/outline";
import TransactionsBox from "../components/TransactionsBox";

export default function Transactions() {
  const sideBar = useRecoilValue(sideBarOpen);
  const transactions = [
    {
      account: "Ansh Arora",
      amount: "1823",
      date: "24 January",
      type: "debit",
    },
    {
      account: "Harkirat Singh",
      amount: "1202",
      date: "24 January",
      type: "credit",
    },
    {
      account: "Big assNamethat",
      amount: "10289",
      date: "24 January",
      type: "credit",
    },
    {
      account: "Ansh Arora",
      amount: "183",
      date: "24 January",
      type: "credit",
    },
    { account: "Ansh Arora", amount: "23", date: "24 March", type: "debit" },
    { account: "Ansh Arora", amount: "23", date: "24 March", type: "credit" },
    { account: "Ansh Arora", amount: "23", date: "24 March", type: "debit" },
    { account: "Ansh Arora", amount: "23", date: "24 March", type: "credit" },
  ];
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
            text={"Transactions"}
            icon={<UserIcon className="text-neutral-300 h-5 md:h-6"></UserIcon>}
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
          <TransactionsBox transactions={transactions}></TransactionsBox>
        </div>
        <MobileNav></MobileNav>
        <Gradients></Gradients>
      </div>
    </div>
  );
}
