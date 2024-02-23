import React from "react";
import MoneyIndex from "./MoneyIndex";
import MoneyUserList from "./MoneyUserList";
import PaginationPrevButton from "./PaginationPrevButton";
import PaginationNextButton from "./PaginationNextButton";
import SendMoneyHeader from "./SendMoneyHeader";
import AddFriendList from "./AddFriendList";
export default function SendMoney({ users }) {
  return (
    <div className="flex flex-col w-full h-full py-5 px-6">
      <SendMoneyHeader></SendMoneyHeader>
      <MoneyIndex></MoneyIndex>
      <AddFriendList friends={users}></AddFriendList>
      {/* <MoneyUserList users={users}></MoneyUserList> */}
      <div className="ml-auto mr-auto mt-auto ">
        <PaginationPrevButton></PaginationPrevButton>
        <PaginationNextButton></PaginationNextButton>
      </div>
    </div>
  );
}
