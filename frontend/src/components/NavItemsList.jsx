import React from "react";
import NavItems from "./NavItems";

export default function ({ navItems }) {
  return (
    <div className="flex flex-col py-40 gap-10">
      {navItems.map((item) => {
        return <NavItems icon={item.icon} text={item.text}></NavItems>;
      })}
    </div>
  );
}
