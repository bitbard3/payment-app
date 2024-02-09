import React from "react";

export default function FormInput({ placeholder, type, mt }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`bg-transparent text-light border mt border-t-0 ${mt} border-x-0 border-b-light w-3/4 focus:outline-0`}
    />
  );
}
