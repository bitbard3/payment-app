import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
export default function HeaderAccount({ user, icon }) {
  return (
    <div className="rounded-lg flex items-center gap-3 bg-box bg-opacity-60 px-6 py-2">
      {icon}
      <span className="text-light font-medium text-sm md:text-base">
        {user ? (
          user
        ) : (
          <Skeleton className=" bg-gray-400 w-16 h-5 rounded-xl"></Skeleton>
        )}
      </span>
    </div>
  );
}
