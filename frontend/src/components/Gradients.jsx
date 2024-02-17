import React from "react";

export default function Gradients() {
  return (
    <>
      <div className="absolute h-1/3 blur-[500px] bg-opacity-35  w-1/5 bg-yellow"></div>
      <div className="absolute h-1/6 blur-[500px] bg-opacity-35  -bottom-10 w-1/5 bg-yellow"></div>
      <div className="absolute h-1/3  blur-[500px] bg-opacity-30  w-1/5 bg-purple left-[40%] -top-20"></div>
      <div className="absolute h-1/3  blur-[500px] bg-opacity-20  w-1/5 bg-purple left-[30%] -bottom-52"></div>
      <div className="absolute h-1/3  blur-[500px] bg-opacity-30 w-1/5 bg-purple -right-20 top-[40%]"></div>
    </>
  );
}
