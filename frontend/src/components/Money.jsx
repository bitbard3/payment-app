import React from "react";
import MoneyHeader from "./MoneyHeader";
import MoneyIndex from "./MoneyIndex";
import MoneyUserList from "./MoneyUserList";
import friend from "../images/friend.svg";
import { useRecoilValue } from "recoil";
import { user } from "@/stores/atom/user";
import { useNavigate } from "react-router-dom";

export default function Money() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(user);
  return (
    <div className="flex flex-col w-full h-full py-5 px-6 relative">
      <MoneyHeader></MoneyHeader>
      {userInfo.friendsLength == 0 ? (
        <>
          <img src={friend} className="h-1/2 mt-auto mb-auto" alt="" />
          <div className="mr-auto ml-auto mb-auto">
            <button
              onClick={() => navigate("/payment")}
              className="text-light text-xs md:text-base px-3.5 py-1.5 font-medium border border-neutral-400 rounded-md"
            >
              Add friends
            </button>
          </div>
        </>
      ) : (
        <>
          <MoneyIndex></MoneyIndex>
          <MoneyUserList></MoneyUserList>
        </>
      )}
    </div>
  );
}
