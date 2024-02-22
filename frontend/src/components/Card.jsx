import React from "react";
import CardValue from "./CardValue";
import { useRecoilValueLoadable } from "recoil";
import { user } from "@/stores/atom/user";

export default function Card({}) {
  const userAtomLoadable = useRecoilValueLoadable(user);
  return (
    <div className="flex md:justify-around justify-center items-center px-5 h-full">
      <div className="flex flex-col justify-center items-center md:h-4/5 md:w-[40%] bg-dark bg-opacity-9 w-[60%] h-[85%] xl:w-[20%] xl:h-[75%] lg:h-[70%] lg:w-[35%] rounded-xl py-8 hover:scale-105 delay-100">
        <p className="text-neutral-400 text-base md:text-lg">Balance</p>
        <CardValue value={userAtomLoadable.contents.balance}></CardValue>
      </div>
      <div className="md:flex flex-col items-center justify-center md:h-4/5 md:w-[40%] bg-dark bg-opacity-9 w-[50%] xl:w-[20%] xl:h-[75%] h-full lg:h-[70%] lg:w-[35%] rounded-xl py-8 hover:scale-105 delay-100 hidden">
        <p className="text-neutral-400 text-base md:text-lg">Transactions</p>
        <CardValue
          value={userAtomLoadable.contents.transactionsLength}
        ></CardValue>
      </div>
      <div className="xl:flex flex-col items-center justify-center md:h-4/5 md:w-[20%] bg-dark bg-opacity-9 w-[50%] xl:w-[20%] xl:h-[75%] lg:h-[70%] lg:w-[35%] h-full rounded-xl py-8 hover:scale-105 delay-100 hidden">
        <p className="text-neutral-400 text-base md:text-lg">Friends</p>
        <CardValue value={userAtomLoadable.contents.friendsLength}></CardValue>
      </div>
    </div>
  );
}
