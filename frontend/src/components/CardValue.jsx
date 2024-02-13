import React from "react";

export default function CardValue({ value }) {
  return (
    <p className="text-light text-2xl md:text-4xl xl:font-normal   font-medium mt-10 ">
      {value}
    </p>
  );
}
