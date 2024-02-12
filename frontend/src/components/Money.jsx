import React from "react";
import MoneyHeader from "./MoneyHeader";
import MoneyIndex from "./MoneyIndex";
import MoneyUserList from "./MoneyUserList";

export default function Money({ users }) {
  return (
    <div className="flex flex-col w-full h-full py-5 px-6">
      <MoneyHeader></MoneyHeader>
      <MoneyIndex></MoneyIndex>
      <MoneyUserList users={users}></MoneyUserList>
    </div>
  );
}
