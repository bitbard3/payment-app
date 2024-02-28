import React, { useState } from "react";
import MoneyIndex from "./MoneyIndex";
import MoneyUserList from "./MoneyUserList";
import SendMoneyHeader from "./SendMoneyHeader";
import { toast, useToast } from "@/components/ui/use-toast";
import AddFriendList from "./AddFriendList";
import axios from "axios";
import FriendsIndex from "./FriendsIndex";
import { useRecoilValue } from "recoil";
import { user } from "@/stores/atom/user";
import friend from "../images/friend.svg";
export default function SendMoney() {
  const [currentTab, setCurrentTab] = useState("money");
  const [searchInput, setSearchInput] = useState("");
  const [friends, setFriends] = useState([]);
  const { toast } = useToast();
  const userInfo = useRecoilValue(user);
  const onClickHandler = async () => {
    try {
      const userList = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?filter=${searchInput}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      if (userList.data.length == 0) {
        toast({
          variant: "destructive",
          description: `No user found!`,
        });
      } else {
        setFriends(userList.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col w-full h-full py-5 px-6 relative">
      <SendMoneyHeader
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onChange={(e) => setSearchInput(e.target.value)}
        onClick={onClickHandler}
        setFriends={setFriends}
      ></SendMoneyHeader>
      {currentTab == "money" ? (
        userInfo.friendsLength == 0 ? (
          <div className="absolute h-full w-full flex flex-col justify-center items-center gap-5">
            <p className="text-light md:text-lg font-medium">
              You havent added any friends
            </p>
            <img src={friend} className="md:h-1/2 h-1/3" alt="" />
            <button
              onClick={() => setCurrentTab("friends")}
              className="text-light px-3.5 py-1.5 font-medium border border-neutral-400 rounded-md"
            >
              Add friends
            </button>
          </div>
        ) : (
          <>
            <MoneyIndex></MoneyIndex>
            <MoneyUserList></MoneyUserList>
          </>
        )
      ) : (
        <>
          <FriendsIndex></FriendsIndex>
          <AddFriendList friends={friends}></AddFriendList>
        </>
      )}
      <div className="ml-auto mr-auto mt-auto "></div>
    </div>
  );
}
