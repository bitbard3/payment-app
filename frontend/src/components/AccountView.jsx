import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useRecoilValue } from "recoil";
import { user } from "@/stores/atom/user";
export default function AccountView() {
  const userInfo = useRecoilValue(user);
  const url = `http://localhost:5173/user/${userInfo.username}`;
  return (
    <div className="h-1/2 w-3/4 flex flex-col items-center relative">
      <QRCodeCanvas value={url} size={200} />
      <p className="text-stone-400 text-lg mt-10">@{userInfo.username}</p>
      <p className="text-light mt-2">
        {userInfo.firstName} {userInfo.lastName}
      </p>
    </div>
  );
}
