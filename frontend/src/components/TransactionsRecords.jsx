import React from "react";

export default function TransactionsRecords({
  index,
  amount,
  account,
  date,
  type,
}) {
  return (
    <>
      <div className="col-span-1 md:col-span-1 mt-2">
        <div className="">{index}</div>
      </div>
      <div className="col-span-3 md:col-span-3">
        <div className="flex items-center md:justify-center mt-2">
          <p
            className={`overflow-hidden text-ellipsis bg-opacity-45 px-3 py-0.5 rounded-lg ${
              type == "debit" ? `bg-red-600` : `bg-green-600`
            } `}
          >
            {type == "debit" ? "-" : "+"} {amount}
          </p>
        </div>
      </div>
      <div className="col-span-3 md:col-span-3">
        <div className="flex items-center md:justify-center mt-2">
          <p className="overflow-hidden text-ellipsis">{account}</p>
        </div>
      </div>
      <div className="col-span-3 md:col-span-3">
        <div className="flex items-center md:justify-center mt-2">
          <p className="overflow-hidden text-ellipsis">{date}</p>
        </div>
      </div>
    </>
  );
}
