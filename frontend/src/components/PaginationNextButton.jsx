import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export default function PaginationNextButton({ disabled }) {
  return (
    <button
      disabled={disabled}
      className="bg-neutral-300 text-zinc-950 pl-3 pr-1.5 py-1 mr-4 rounded-lg  enabled:hover:bg-neutral-100 z-10 text-sm md:text-base enabled:hover:scale-105 duration-700
  disabled:bg-neutral-600 disabled:opacity-40"
    >
      Next
      <ChevronRightIcon className="h-5 md:h-6 inline pb-0.5 text-zinc-800 -ml-0.5"></ChevronRightIcon>
    </button>
  );
}
