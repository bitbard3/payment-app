import React from "react";

export default function HeaderHeading({ text }) {
  return (
    <h3 className="text-light md:text-2xl text-lg tracking-wider font-semibold ">
      {text}
    </h3>
  );
}
