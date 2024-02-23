import React, { useState } from "react";
import MoneyIndex from "./MoneyIndex";
import MoneyUserList from "./MoneyUserList";
import PaginationPrevButton from "./PaginationPrevButton";
import PaginationNextButton from "./PaginationNextButton";
import SendMoneyHeader from "./SendMoneyHeader";
import AddFriendList from "./AddFriendList";
export default function SendMoney({ users }) {
  const [currentTab, setCurrentTab] = useState("money");
  return (
    <div className="flex flex-col w-full h-full py-5 px-6">
      <SendMoneyHeader
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      ></SendMoneyHeader>
      <MoneyIndex></MoneyIndex>
      {currentTab == "money" ? (
        <MoneyUserList users={users}></MoneyUserList>
      ) : (
        <AddFriendList friends={users}></AddFriendList>
      )}
      <div className="ml-auto mr-auto mt-auto ">
        <PaginationPrevButton></PaginationPrevButton>
        <PaginationNextButton></PaginationNextButton>
      </div>
    </div>
  );
}
