import React from "react";
import TransactionsHeaders from "./TransactionsHeaders";
import TransactionsLabel from "./TransactionsLabel";
import TransactionsRecordsList from "./TransactionsRecordsList";
import PaginationPrevButton from "./PaginationPrevButton";
import PaginationNextButton from "./PaginationNextButton";

export default function TransactionsBox({ transactions }) {
  return (
    <div className="flex flex-col w-full h-full py-5 px-6">
      <TransactionsHeaders></TransactionsHeaders>
      <TransactionsLabel></TransactionsLabel>
      <TransactionsRecordsList
        transactions={transactions}
      ></TransactionsRecordsList>
      <div className="ml-auto mr-auto mt-auto ">
        <PaginationPrevButton></PaginationPrevButton>
        <PaginationNextButton></PaginationNextButton>
      </div>
    </div>
  );
}
