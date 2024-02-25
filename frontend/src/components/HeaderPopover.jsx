import React from "react";

export default function HeaderPopover() {
  return (
    <div className="flex flex-col gap-3">
      <button className="text-light border-b-[1px] text-sm md:text-base border-neutral-400 pb-3">
        Friend Requests
      </button>
      <button className="text-light text-sm md:text-base  border-neutral-400 pb-1">
        Logout
      </button>
    </div>
  );
}
