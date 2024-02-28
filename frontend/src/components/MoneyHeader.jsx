import React from "react";
import { useNavigate } from "react-router-dom";

export default function MoneyHeader({}) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full items-center">
      <p className="text-light md:text-lg text-base font-medium">Send money</p>
      <button
        onClick={() => navigate("/payment")}
        className={`text-purple ms-auto md:text-sm text-xs underline-offset-[3px] font-medium underline z-10`}
      >
        See more
      </button>
    </div>
  );
}
