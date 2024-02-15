import React from "react";
import MoneyHeader from "./MoneyHeader";
import MoneyIndex from "./MoneyIndex";
import MoneyUserList from "./MoneyUserList";
import PaginationPrevButton from "./PaginationPrevButton";
import PaginationNextButton from "./PaginationNextButton";
export default function SendMoney({ users }) {
  return (
    <div className="flex flex-col w-full h-full py-5 px-6">
      <MoneyHeader hidden={"hidden"}></MoneyHeader>
      <MoneyIndex></MoneyIndex>
      <MoneyUserList users={users}></MoneyUserList>
      <div className="ml-auto mr-auto mt-auto ">
        <PaginationPrevButton></PaginationPrevButton>
        <PaginationNextButton></PaginationNextButton>
      </div>
    </div>
  );
}
