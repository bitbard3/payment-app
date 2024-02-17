import React from "react";

export default function FormButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className=" font-medium slide-form px-5 py-1.5 rounded-md border border-secondary text-light"
    >
      {text}
    </button>
  );
}
