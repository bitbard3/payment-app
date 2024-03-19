import React from "react";
import { Skeleton } from "./ui/skeleton";
export default function EditAccountInput({
  disabled,
  id,
  type,
  label,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col ">
      <label htmlFor={id} className="text-neutral-200">
        {label}
      </label>
      {value ? (
        <input
          id={id}
          type={type}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className=" bg-transparent disabled:text-neutral-500 border-b-light text-light border border-t-0 border-x-0 disabled:border-b-neutral-500 w-full focus:outline-0 mt-3 lg:mt-0 xl:mt-3"
        />
      ) : (
        <Skeleton className="w-full h-4 bg-gray-600"></Skeleton>
      )}
    </div>
  );
}
