import React from "react";

export default function FormIcon({ icon }) {
  return (
    <button className="">
      <div
        className={`rounded-full border border-light p-1.5 hover:scale-110 duration-200`}
      >
        {icon}
      </div>
    </button>
  );
}
