import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { user as userInfo } from "@/stores/atom/user";
import { useRecoilValueLoadable } from "recoil";
export default function HeaderAccount({ user, icon }) {
  const userAtomLoadable = useRecoilValueLoadable(userInfo);
  return (
    <div className="rounded-lg relative flex items-center gap-3 bg-box bg-opacity-60 px-6 py-2">
      {icon}
      <span className="text-light font-medium text-sm md:text-base">
        {user ? (
          user
        ) : (
          <Skeleton className=" bg-gray-400 w-16 h-5 rounded-xl"></Skeleton>
        )}
      </span>
      {userAtomLoadable.state === "hasValue" &&
        userAtomLoadable.contents.friendRequestsLength > 0 && (
          <div className="bg-[#b73a3a] absolute h-3 w-3 rounded-full top-[2px] -left-[3px]"></div>
        )}
    </div>
  );
}
