import React from "react";
import TransactionsHeaders from "./TransactionsHeaders";
import TransactionsLabel from "./TransactionsLabel";
import TransactionsRecordsList from "./TransactionsRecordsList";

export default function TransactionsBox() {
  return (
    <div className="flex flex-col w-full h-full py-5 px-6">
      <TransactionsHeaders></TransactionsHeaders>
      <TransactionsLabel></TransactionsLabel>
      <TransactionsRecordsList></TransactionsRecordsList>
      <div className="ml-auto mr-auto mt-auto "></div>
    </div>
  );
}
