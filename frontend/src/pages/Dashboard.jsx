import React, { useEffect } from "react";
import NavItemsList from "../components/NavItemsList";
import Card from "../components/Card";
import Money from "../components/Money";
import Header from "../components/Header";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { sideBarOpen } from "../stores/atom/sideBar";
import MobileNav from "../components/MobileNav";
import Gradients from "../components/Gradients";
import { UserIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { user } from "@/stores/atom/user";
const userList = [
  { firstName: "Ansh", lastName: "Arora" },
  { firstName: "Chirag", lastName: "Lalwani" },
  { firstName: "Jalaj", lastName: "Daga" },
  { firstName: "Harkirat", lastName: "Singh" },
];
export default function Dashboard() {
  const setUserInfo = useSetRecoilState(user);
  const sideBar = useRecoilValue(sideBarOpen);
  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await axios.get(
          "http://localhost:3000/api/v1/user/userInfo",
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        const transactions = await axios.get(
          "http://localhost:3000/api/v1/transaction/transactions",
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        const userAccount = {
          userId: user.data.userData._id,
          username: user.data.userData.username,
          firstName: user.data.userData.firstName,
          lastName: user.data.userData.lastName,
          balance: user.data.userData.balance,
          friends: [...user.data.userData.friends],
          friendRequests: [...user.data.userData.friendRequests],
          transactions: [...transactions.data.transactions],
          friendsLength: [...user.data.userData.friends].length,
          transactionsLength: [...transactions.data.transactions].length,
        };
        setUserInfo(userAccount);
      } catch (error) {}
    }
    fetchUser();
  }, []);

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
          <Money users={userList}></Money>
        </div>

        <Gradients></Gradients>
        <MobileNav></MobileNav>
      </div>
    </div>
  );
}
