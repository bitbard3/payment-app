import React from "react";

export default function EditAccountInput({ disabled, id, type, label }) {
  return (
    <div className="flex flex-col ">
      <label htmlFor={id} className="text-neutral-200">
        {label}
      </label>
      <input
        id={id}
        type={type}
        disabled={disabled}
        className=" bg-transparent disabled:text-neutral-500 border-b-light text-light border border-t-0 border-x-0 disabled:border-b-neutral-500 w-full focus:outline-0 mt-3"
      />
    </div>
  );
}