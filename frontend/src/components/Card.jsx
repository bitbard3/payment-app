import React from "react";
import CardItem from "./CardItem";

export default function Card({ items }) {
  return (
    <div className="flex justify-around items-center px-5 h-full">
      {items.map((item) => {
        return <CardItem heading={item.heading} value={item.value}></CardItem>;
      })}
    </div>
  );
}
