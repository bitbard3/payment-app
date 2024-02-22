import React from "react";
import TransactionsRecords from "./TransactionsRecords";
import { useRecoilValueLoadable } from "recoil";
import { user } from "@/stores/atom/user";

export default function () {
  const userAtomLoadable = useRecoilValueLoadable(user);
  return (
    <div className="w-full grid grid-cols-10 mt-3 px-3 text-light  gap-5 text-sm md:text-base">
      {userAtomLoadable.state === "loading" ? (
        <p>Loading...</p>
      ) : (
        userAtomLoadable.contents.transactions.map((transaction, index) => (
          <TransactionsRecords
            key={transaction._id}
            userId={userAtomLoadable.contents.userId}
            sender={transaction.sender}
            senderName={transaction.senderName}
            receiverName={transaction.receiverName}
            amount={transaction.amount}
            index={index + 1}
            date={transaction.date}
          />
        ))
      )}
    </div>
  );
}
