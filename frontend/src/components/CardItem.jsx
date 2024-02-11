import React from "react";
import CardValue from "./CardValue";

export default function CardItem({ value, heading }) {
  return (
    <div className="flex flex-col items-center h-4/5 w-[20%] bg-dark bg-opacity-90 rounded-xl py-8 hover:scale-105 delay-100">
      <p className="text-neutral-400 text-lg">{heading}</p>
      <CardValue value={value}></CardValue>
    </div>
  );
}
