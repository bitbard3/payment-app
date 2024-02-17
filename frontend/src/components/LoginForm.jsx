import React, { useState } from "react";
import FormButton from "./FormButton";
import FormTitle from "./FormTitle";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import UsernameInput from "./UsernameInput";
export default function LoginForm() {
  const [emailError, setEmailError] = useState("");
  return (
    <div className="h-[80%] md:h-[70%] w-[90%] md:w-2/3 lg:w-[60%] xl:w-1/3 xl:h-[80%] border relative border-stone-500 border-opacity-80 rounded-lg py-20 form">
      <div className="flex flex-col justify-around items-center h-full">
        <FormTitle title={"Login!"}></FormTitle>
        <div className="flex mt-14 md:mt-20 w-6/12 justify-around">
          <button className="">
            <div
              className={`rounded-full border bg-secondary border-light p-1.5 hover:scale-110 duration-200`}
            >
              <EnvelopeIcon className="h-6 text-neutral-200"></EnvelopeIcon>
            </div>
          </button>
        </div>
        <>
          {" "}
          <UsernameInput></UsernameInput>{" "}
          <p className=" text-[#b15b5b] text-xs md:text-sm pr-12 md:pr-16 xl:pr-14 mt-3 ml-auto">
            {emailError}
          </p>{" "}
        </>
        <div className="h-[30%] w-1 my-5"></div>
      </div>
      <div className="ml-auto absolute right-[13%] bottom-[5%] md:bottom-[10%]">
        <FormButton text={"Login"}></FormButton>
      </div>
    </div>
  );
}
