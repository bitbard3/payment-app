import React from "react";
import { Skeleton } from "./ui/skeleton";
export default function CardValue({ value }) {
  return (
    <p className="text-light text-2xl md:text-4xl xl:font-normal   font-medium mt-10 ">
      {value === null ? (
        <Skeleton className="w-20 h-7 rounded-xl bg-gray-400"></Skeleton>
      ) : (
        value
      )}
    </p>
  );
}
