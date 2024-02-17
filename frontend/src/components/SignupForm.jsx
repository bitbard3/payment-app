import React, { useState } from "react";
import FormButton from "./FormButton";
import FormTitle from "./FormTitle";
import { UserIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import NameInput from "./NameInput";
import UsernameInput from "./UsernameInput";
export default function SignupForm() {
  const [page, setPage] = useState(0);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  return (
    <div className="h-[80%] md:h-[70%] w-[90%] md:w-2/3 lg:w-[60%] xl:w-1/3 xl:h-[80%] border relative border-stone-500 border-opacity-80 rounded-lg py-20 form">
      <div className="flex flex-col justify-around items-center h-full">
        <FormTitle title={"Signup"}></FormTitle>
        <div className="flex mt-14 md:mt-20 w-6/12 justify-around">
          <button onClick={() => setPage(0)}>
            <div
              className={`rounded-full border border-light p-1.5 hover:scale-110 duration-200 ${
                page == 0 ? `bg-purple hover:scale-100` : ``
              }`}
            >
              <UserIcon className="h-6 text-neutral-200"></UserIcon>
            </div>
          </button>
          <button className="" onClick={() => setPage(1)}>
            <div
              className={`rounded-full border border-light p-1.5 hover:scale-110 duration-200 ${
                page == 1 ? `bg-purple hover:scale-100` : ``
              }`}
            >
              <EnvelopeIcon className="h-6 text-neutral-200"></EnvelopeIcon>
            </div>
          </button>
        </div>
        {page == 0 ? (
          <>
            {" "}
            <NameInput></NameInput>{" "}
            <p className=" text-[#b15b5b] text-xs md:text-sm pr-10 md:pr-16 xl:pr-14 lg:pr-20 mt-3 ml-auto">
              {nameError}
            </p>{" "}
          </>
        ) : (
          <>
            {" "}
            <UsernameInput></UsernameInput>{" "}
            <p className=" text-[#b15b5b] text-xs md:text-sm pr-10 md:pr-16 xl:pr-14 mt-3 ml-auto">
              {emailError}
            </p>{" "}
          </>
        )}
        <div className="h-[30%] w-1 my-5"></div>
      </div>
      <div
        className={`opacity-60 absolute left-[13%] bottom-[5%] md:bottom-[10%] ${
          page == 0 ? `hidden` : ``
        }`}
      >
        <FormButton
          onClick={() => setPage((curr) => curr - 1)}
          text={"Back"}
        ></FormButton>
      </div>
      <div className="ml-auto absolute right-[13%] bottom-[5%] md:bottom-[10%]">
        {page == 0 ? (
          <FormButton
            onClick={() => setPage((curr) => curr + 1)}
            text={"Next"}
          ></FormButton>
        ) : (
          <FormButton text={"Signup"}></FormButton>
        )}
      </div>
    </div>
  );
}
