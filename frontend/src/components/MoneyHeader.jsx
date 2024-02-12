import React from "react";

export default function MoneyHeader() {
  return (
    <div className="flex w-full items-center">
      <p className="text-light text-lg font-medium">Send money</p>
      <p className="text-secondary ms-auto text-sm underline-offset-[3px] font-medium underline hover:cursor-pointer z-10">
        See more
      </p>
    </div>
  );
}
