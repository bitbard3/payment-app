import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

export default function PaginationPrevButton({ disabled }) {
  return (
    <button
      disabled={disabled}
      className="bg-neutral-300 text-zinc-950 disabled:bg-neutral-600 disabled:opacity-40 pr-3 pl-1.5 py-1 mr-4 rounded-lg z-10 text-sm md:text-base enabled:hover:bg-neutral-100 enabled:hover:scale-105 duration-700 "
    >
      <ChevronLeftIcon className="h-5 md:h-6 inline pb-0.5 text-zinc-800 -mr-0.5"></ChevronLeftIcon>
      Previous
    </button>
  );
}
