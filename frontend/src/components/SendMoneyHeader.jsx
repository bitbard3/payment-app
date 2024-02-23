import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
export default function SendMoneyHeader({ currentTab, setCurrentTab }) {
  return (
    <div className="flex flex-col items-end gap-2 md:gap-0">
      <div className="flex w-full items-center">
        <button
          onClick={() => {
            setCurrentTab("money");
          }}
          className={`z-10 border px-3 py-1.5
          ${
            currentTab == "money"
              ? ` border-b-purple  border-x-0 border-t-0`
              : `border-0 rounded-md hover:bg-neutral-300 hover:bg-opacity-15 hover:scale-[0.98] `
          }`}
        >
          <p className="text-light md:text-lg text-base font-medium">Send</p>
        </button>
        <button
          onClick={() => {
            setCurrentTab("friends");
          }}
          className={`z-10 border px-3 py-1.5 md:ml-10 ml-3
          ${
            currentTab == "friends"
              ? ` border-b-purple  border-x-0 border-t-0 duration-0`
              : `border-0  rounded-md hover:bg-neutral-300 hover:bg-opacity-15 hover:scale-[0.98] `
          }`}
        >
          <p className="text-light md:text-lg text-base font-medium">Add</p>
        </button>
      </div>
      {currentTab == "friends" && (
        <div className="md:w-1/2 w-full mb-1 md:mb-0">
          <div class="relative w-full">
            <input
              id="default-search"
              class="block w-full p-2 text-sm ps-5 text-gray-900  rounded-lg bg-gray-50"
              placeholder='Try  "test" . . . '
              required
            />
            <button
              type="submit"
              class="text-white absolute end-1 bottom-0.5 focus:ring-0 focus:outline-none  font-medium rounded-lg text-sm px-2 py-1 "
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
