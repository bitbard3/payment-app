import React, { useState } from "react";
import MoneyIndex from "./MoneyIndex";
import MoneyUserList from "./MoneyUserList";
import SendMoneyHeader from "./SendMoneyHeader";
import { toast, useToast } from "@/components/ui/use-toast";
import AddFriendList from "./AddFriendList";
import axios from "axios";
export default function SendMoney() {
  const [currentTab, setCurrentTab] = useState("money");
  const [searchInput, setSearchInput] = useState("");
  const [friends, setFriends] = useState([]);
  const { toast } = useToast();
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
    <div className="flex flex-col w-full h-full py-5 px-6">
      <SendMoneyHeader
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onChange={(e) => setSearchInput(e.target.value)}
        onClick={onClickHandler}
        setFriends={setFriends}
      ></SendMoneyHeader>
      <MoneyIndex></MoneyIndex>
      {currentTab == "money" ? (
        <MoneyUserList></MoneyUserList>
      ) : (
        <AddFriendList friends={friends}></AddFriendList>
      )}
      <div className="ml-auto mr-auto mt-auto "></div>
    </div>
  );
}
