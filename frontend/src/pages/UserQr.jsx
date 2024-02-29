import QrPay from "@/components/QrPay";
import { user } from "@/stores/atom/user";
import React from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
export default function UserQr() {
  const { username } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("id");
  return (
    <div>
      <div className="h-screen w-screen bg-dark flex items-center justify-center">
        <div className="bg-[#171a3a] h-[90%] w-[90%] rounded-2xl  flex items-center justify-center">
          <QrPay username={username} userId={userId} />
        </div>
      </div>
    </div>
  );
}
