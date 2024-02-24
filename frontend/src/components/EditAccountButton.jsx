import React from "react";

export default function EditAccountButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-white border border-purple px-10 text-sm md:px-12 w-1/12 flex justify-center ms-auto md:mt-8 mt-4 rounded-2xl md:rounded-3xl py-2 md:py-2.5  z-10 slide-form"
    >
      Update
    </button>
  );
}
