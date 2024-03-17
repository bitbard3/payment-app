import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import heroImg from "../images/hero.svg";
import { useNavigate } from "react-router-dom";
import { startTransition } from "react";
import axios from "axios";
import { Button, MovingBorder } from "@/components/ui/BorderButton";
export default function Landing() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const onClickHandler = async () => {
    if (localStorage.getItem("token")) {
      setDisabled(true);
      try {
        const valid = await axios.get(
          "https://payment-app-red.vercel.app/api/v1/user/validUser",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        startTransition(() => {
          navigate("/dashboard");
        });
      } catch (error) {
        navigate("/login");
        setDisabled(false);
      }
    } else {
      navigate("/login");
      setDisabled(false);
    }
  };
  return (
    <div>
      <div className="h-screen w-screen bg-dark relative overflow-hidden">
        <div className="flex flex-col h-full w-full md:items-center md:px-0 px-4 justify-center">
          <h1 className="hero text-light md:text-center text-[2rem] leading-[3rem] md:text-5xl md:leading-[5rem] lg:text-6xl lg:leading-[5.5rem] lg:pt-16 xl:pt-0">
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
          <p className="md:text-center text-xs md:text-base lg:text-lg text-stone-300 opacity-50 pt-5">
            Empower Your Finances, Anytime, Anywhere <br />
            Start your journey today!
          </p>
          <div className="flex items-center md:justify-center mt-9 md:mt-16 w-3/5">
            <Button
              onClick={onClickHandler}
              className="bg-dark"
              children={"Get Started"}
              duration={3000}
              borderRadius="10px"
              disabled={disabled}
              loadingChildren={
                <div
                  className="animate-spin  mr-3 inline-block size-5 border-[3px] border-current border-t-transparent rounded-full"
                  role="status"
                  aria-label="loading"
                ></div>
              }
            />
          </div>
          <div className="md:h-52 h-32"></div>
          <div className=" absolute bottom-0 lg:hidden xl:block">
            <img src={heroImg} className="heroImg" />
          </div>
          <div className="bottom-1/4 absolute -left-20 bg-yellow w-1/6 h-1/2 bg-opacity-60 rounded-full blur-[190px]"></div>
          <div className="bottom-1/4 absolute -right-20 bg-opacity-40 bg-purple w-1/6 h-1/2 rounded-full blur-[190px]"></div>
        </div>
        <div className="absolute w-full top-5">
          <div className="flex w-full justify-end px-5 gap-7 md:px-10 md:gap-14">
            <NavLink
              to={"/login"}
              className="md:text-lg text-neutral-400 hover:border-b-[1px] duration-150 hover:text-light"
            >
              Login
            </NavLink>
            <NavLink
              to={"/signup"}
              className="md:text-lg text-neutral-400 hover:border-b-[1px] duration-150 hover:text-light"
            >
              Signup
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
