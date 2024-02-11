import React from "react";

export default function HeaderHeading({ text }) {
  return (
    <h3 className="text-light text-2xl  tracking-wider font-semibold pt-2">
      {text}
    </h3>
  );
}
