import React from "react";
import TransactionsRecords from "./TransactionsRecords";

export default function ({ transactions }) {
  return (
    <div className="w-full grid grid-cols-10 mt-3 px-3 text-light  gap-5 text-sm md:text-base">
      {transactions.map((transaction, index) => {
        return (
          <TransactionsRecords
            type={transaction.type}
            account={transaction.account}
            amount={transaction.amount}
            index={index + 1}
            date={transaction.date}
          ></TransactionsRecords>
        );
      })}
    </div>
  );
}
