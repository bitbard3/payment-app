import React from "react";
import { useNavigate } from "react-router-dom";
import error404 from "../images/error404.svg";
export default function Error404() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-10 bg-dark">
        <p className="md:text-3xl text-xl font-semibold text-light">
          Page not Found
        </p>
        <img src={error404} className="md:h-1/3 h-1/4" alt="" />
        <button
          onClick={() => navigate("/")}
          className="text-light text-sm md:text-base px-5 py-1.5 border border-neutral-400 rounded-md font-medium"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
