import React from "react";

export default function FormButton({ text, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className=" font-medium flex items-center gap-3 justify-center enabled:slide-form disabled:border-opacity-70 disabled:text-neutral-400 px-5 py-1.5 rounded-md border border-purple text-light"
    >
      {disabled && (
        <div
          className="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent rounded-full my-1"
          role="status"
          aria-label="loading"
        ></div>
      )}
      {text}
    </button>
  );
}
