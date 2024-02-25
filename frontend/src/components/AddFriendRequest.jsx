import React from "react";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/16/solid";
export default function AddFriendRequest({
  firstName,
  lastName,
  onRemoveHandler,
  onAddHandler,
}) {
  return (
    <div className="flex  justify-between border-b-[1px] py-5">
      <p>{firstName}</p>
      <p>{lastName}</p>
      <div className="flex gap-4">
        <button onClick={onAddHandler} className="">
          <UserPlusIcon className="h-6 w-6 text-gray-500 opacity-80" />
        </button>
        <button onClick={onRemoveHandler} className="">
          <UserMinusIcon className="h-6 w-6 text-gray-500 opacity-80" />
        </button>
      </div>
    </div>
  );
}
