import React from "react";
import heroImg from "../images/hero.svg";
export default function Landing() {
  return (
    <div>
      <div className="h-screen w-screen bg-dark relative overflow-hidden">
        <div className="flex flex-col h-full w-full items-center justify-center">
          <h1 className="hero text-light text-center text-3xl leading-[3rem] md:text-5xl md:leading-[5rem] lg:text-6xl lg:leading-[5.5rem]">
            Secure{" "}
            <span className="yellow-word border border-b-yellow border-x-0 border-t-0 md:pl-2 border-b-[4px]">
              Payments
            </span>{" "}
            <br />{" "}
            <span className="purple-word border border-b-purple border-x-0 border-t-0 md:pl-2 border-b-[4px]">
              Streamlined
            </span>{" "}
            Experience
          </h1>
          <p className="text-center text-xs md:text-base lg:text-lg text-stone-300 opacity-50 pt-5">
            Empower Your Finances, Anytime, Anywhere <br />
            Enter your email and start today
          </p>
          <div className="flex items-center justify-center  mt-16 w-3/5">
            <div className="relative overflow-hidden p-px rounded-lg">
              <div className="glow w-[70px] h-[70px] absolute rotate-45 hover:scale-110 delay-150"></div>
              <button className="text-light hero-button inline-block  space-y-2  bg-dark  rounded-lg z-10 relative px-10 px-md:16 py-3 delay-150 hover:scale-110 hover:bg-yellow hover:text-dark">
                Get started
              </button>
            </div>
          </div>
          <div className="h-48"></div>
          <div className=" absolute bottom-0">
            <img src={heroImg} className="heroImg" />
          </div>
          <div className="bottom-1/4 absolute -left-20 bg-yellow w-1/6 h-1/2 bg-opacity-60 rounded-full blur-[190px]"></div>
          <div className="bottom-1/4 absolute -right-20 bg-opacity-40 bg-purple w-1/6 h-1/2 rounded-full blur-[190px]"></div>
        </div>
      </div>
    </div>
  );
}
