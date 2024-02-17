import React from "react";

export default function MoneyHeader({ hidden }) {
  return (
    <div className="flex w-full items-center">
      <p className="text-light md:text-lg text-base font-medium">Send money</p>
      <p
        className={`text-purple ms-auto md:text-sm text-xs underline-offset-[3px] font-medium underline hover:cursor-pointer z-10 ${hidden}`}
      >
        See more
      </p>
    </div>
  );
}
