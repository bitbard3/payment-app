import React from "react";
import TransactionsHeaders from "./TransactionsHeaders";
import TransactionsLabel from "./TransactionsLabel";
import TransactionsRecordsList from "./TransactionsRecordsList";
import { useRecoilValueLoadable } from "recoil";
import { user } from "@/stores/atom/user";
import { useNavigate } from "react-router-dom";
import transactions from "../images/transactions.svg";
export default function TransactionsBox() {
  const userAtomLoadable = useRecoilValueLoadable(user);
  const navigate = useNavigate();

  return (
    <>
      {userAtomLoadable.state === "loading" ? (
        <p>Loading...</p>
      ) : userAtomLoadable.contents.transactionsLength === 0 ? (
        <div className="flex flex-col justify-center items-center gap-10">
          <p className="md:text-lg font-medium text-light">
            You dont have any transactions
          </p>
          <img src={transactions} className="h-1/2" alt="" />
          <button
            onClick={() => navigate("/payment")}
            className="text-light border px-3 py-1.5 rounded-md border-neutral-400"
          >
            Transfer Money
          </button>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full py-5 px-6">
          <TransactionsHeaders />
          <TransactionsLabel />
          <TransactionsRecordsList />
          <div className="ml-auto mr-auto mt-auto "></div>
        </div>
      )}
    </>
  );
}
