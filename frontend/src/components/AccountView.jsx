import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useRecoilValueLoadable } from "recoil";
import { Skeleton } from "./ui/skeleton";
import { user } from "@/stores/atom/user";
export default function AccountView() {
  const userInfo = useRecoilValueLoadable(user);
  const url = `https://qr-pay-six.vercel.app/user/${userInfo.contents.username}?id=${userInfo.contents.userId}`;
  const size = window.screen.height > 600 ? 200 : 150
  return (
    <div className="h-1/2 w-3/4 flex flex-col items-center relative">
      <QRCodeCanvas value={url} size={size} />
      <p className="text-stone-400 text-lg mt-10">
        {userInfo.state == "loading" ? (
          <Skeleton className="bg-gray-600 h-3 w-20"></Skeleton>
        ) : (
          "@" + userInfo.contents.username
        )}{" "}
      </p>
      <p className="text-light mt-2">
        {userInfo.state == "loading" ? (
          <Skeleton className="bg-gray-600 h-3 w-20"></Skeleton>
        ) : (
          userInfo.contents.firstName + " " + userInfo.contents.lastName
        )}{" "}
      </p>
    </div>
  );
}
