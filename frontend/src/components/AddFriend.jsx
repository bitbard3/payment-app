import React from "react";

export default function AddFriend({
  firstName,
  lastName,
  index,
  onAddClick,
  onModalHandler,
}) {
  return (
    <>
      <div className="col-span-2 md:col-span-1 mt-2">
        <p>{index}</p>
      </div>
      <div className="col-span-4 md:col-span-5">
        <div className="flex items-center md:justify-center mt-2">
          <p className="overflow-hidden text-ellipsis">
            {firstName} {lastName}
          </p>
        </div>
      </div>

      <div className="col-span-2 md:col-span-2 mt-2">
        <div className="flex items-center justify-end">
          <button
            onClick={onAddClick}
            className="border-purple text-xs md:text-base px-3 border md:px-5 rounded-2xl py-1 z-10 slide"
          >
            <span className="">Add</span>
          </button>
        </div>
      </div>
      <div className="col-span-2 md:col-span-2 mt-2">
        <div className="flex items-center justify-end">
          <button
            onClick={onModalHandler}
            className="border-purple text-xs md:text-base px-3 border md:px-5 rounded-2xl py-1 z-10 slide"
          >
            <span className="">Pay</span>
          </button>
        </div>
      </div>
    </>
  );
}
