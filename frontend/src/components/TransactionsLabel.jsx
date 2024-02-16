import React from "react";

export default function TransactionsLabel() {
  return (
    <div className="w-full grid grid-cols-10 text-neutral-400 text-xs md:text-sm py-2 bg-dark bg-opacity-80 mt-3 px-3 rounded-md">
      <div className="col-span-1 md:col-span-1">
        <div className="">#</div>
      </div>
      <div className="col-span-3 md:col-span-3">
        <div className="flex items-center md:justify-center">
          <p className="overflow-hidden">Amount</p>
        </div>
      </div>
      <div className="col-span-3 md:col-span-3">
        <div className="flex items-center md:justify-center">
          <p className="overflow-hidden">From / To</p>
        </div>
      </div>
      <div className="col-span-3 md:col-span-3">
        <div className="flex items-center md:justify-center">
          <p className="overflow-hidden">Date</p>
        </div>
      </div>
    </div>
  );
}
