import React from "react";

export default function MoneyUser({ firstName, lastName, index }) {
  return (
    <>
      <div className="col-span-2 md:col-span-1 mt-2">
        <p>{index}</p>
      </div>
      <div className="col-span-3 md:col-span-2">
        <div className="flex items-center md:justify-center mt-2">
          <p className="overflow-hidden text-ellipsis">{firstName}</p>
        </div>
      </div>
      <div className="col-span-3 md:col-span-2">
        <div className="flex items-center md:justify-center mt-2">
          <p className="overflow-hidden text-ellipsis">{lastName}</p>
        </div>
      </div>
      <div className="col-span-2 md:col-span-5">
        <div className="flex items-center justify-end">
          <button className="border-purple  border px-5 rounded-2xl py-1 z-10 slide">
            <span className="">Pay</span>
          </button>
        </div>
      </div>
    </>
  );
}
