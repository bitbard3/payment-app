import React from "react";

export default function EditAccountButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-white border border-purple px-10 text-sm md:px-12 w-1/12 flex items-center justify-center ms-auto xl:mt-8 lg:mt-1 md:mt-8 mt-4 rounded-lg py-2 md:py-2.5  z-10 slide-form"
    >
      {disabled && (
        <div
          className="animate-spin px-2 py-2  mr-1 inline-block size-2 border-[3px] border-current border-t-transparent rounded-full"
          role="status"
          aria-label="loading"
        ></div>
      )}
      Update
    </button>
  );
}
