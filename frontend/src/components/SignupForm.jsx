import React, { useState } from "react";
import FormButton from "./FormButton";
import FormTitle from "./FormTitle";
import { UserIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import FormInput from "./FormInput";
import { formSchema } from "@/validation/form.validation";
import axios from "axios";
import { toast, useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
export default function SignupForm() {
  const [page, setPage] = useState(0);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisable, setbuttonDisable] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleNextButton = () => {
    const validData = formSchema
      .pick({ firstName: true, lastName: true })
      .safeParse({ firstName: firstName, lastName: lastName });
    if (!validData.error) {
      setPage((curr) => curr + 1);
    } else {
      setNameError(validData.error.errors[0].message);
    }
  };
  const handleSubmitButton = async () => {
    setbuttonDisable(!buttonDisable);
    const validData = formSchema
      .pick({ username: true, password: true })
      .safeParse({ username: username, password: password });
    if (!validData.error) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_URL}/api/v1/user/signup`,
          {
            firstName,
            lastName,
            username,
            password,
          }
        );
        const token = res.data.token;
        localStorage.setItem("token", `Bearer ${token}`);
        navigate("/dashboard");
        toast({
          variant: "default",
          title: "Money credited",
          description: `On signup a bonus of ${res.data.balance} has been added`,
        });
      } catch (error) {
        if (error.response.status == 409) {
          setEmailError("Username already exists");
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }
      } finally {
        setbuttonDisable(false);
      }
    } else {
      setEmailError(validData.error.errors[0].message);
      setbuttonDisable(false);
    }
  };
  return (
    <div className="h-[80%] md:h-[70%] w-[90%] md:w-2/3 lg:w-[60%] lg:max-w-[400px] lg:h-[90%] lg:max-h-[800px] xl:w-1/3 xl:h-[80%] border relative border-stone-500 border-opacity-80 rounded-lg py-20 form">
      <div className="flex flex-col justify-around items-center h-full">
        <FormTitle title={"Signup"}></FormTitle>
        <div className="flex mt-14 md:mt-20 w-6/12 justify-around">
          <button onClick={() => setPage(0)}>
            <div
              className={`rounded-full border border-light p-1.5 hover:scale-110 duration-200 ${page == 0 ? `bg-purple hover:scale-100` : ``
                }`}
            >
              <UserIcon className="h-6 text-neutral-200"></UserIcon>
            </div>
          </button>
          <button className="" onClick={handleNextButton} disabled={page >= 1}>
            <div
              className={`rounded-full border border-light p-1.5 hover:scale-110 duration-200 ${page == 1 ? `bg-purple hover:scale-100` : ``
                }`}
            >
              <EnvelopeIcon className="h-6 text-neutral-200"></EnvelopeIcon>
            </div>
          </button>
        </div>
        {page == 0 ? (
          <>
            {" "}
            <FormInput
              placeholder="First Name"
              type="text"
              mt="mt-20"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setNameError("");
              }}
            />
            <FormInput
              placeholder="Last Name"
              type="text"
              mt="mt-12"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setNameError("");
              }}
            />
            <p className=" text-[#b15b5b] text-xs md:text-sm pr-11 md:pr-16 xl:pr-14 lg:pr-20 mt-3 ml-auto">
              {nameError}
            </p>{" "}
          </>
        ) : (
          <>
            {" "}
            <FormInput
              placeholder="Username"
              type="text"
              mt="mt-20"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setEmailError("");
              }}
            />
            <FormInput
              placeholder="Password"
              type="password"
              mt="mt-12"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setEmailError("");
              }}
            />
            <p className=" text-[#b15b5b] text-xs md:text-sm pr-11 md:pr-16 xl:pr-14 mt-3 ml-auto">
              {emailError}
            </p>{" "}
          </>
        )}
        <div className="h-[30%] w-1 my-5"></div>
      </div>
      <div
        className={`opacity-60 absolute left-[13%]  lg:bottom-[3%] xl:bottom-[5%] bottom-[5%] md:bottom-[10%] ${page == 0 ? `hidden` : ``
          }`}
      >
        <FormButton
          onClick={() => setPage((curr) => curr - 1)}
          text={"Back"}
        ></FormButton>
      </div>
      <div className="ml-auto absolute right-[13%]  lg:bottom-[3%] xl:bottom-[5%] bottom-[5%] md:bottom-[10%]">
        {page == 0 ? (
          <FormButton onClick={handleNextButton} text={"Next"}></FormButton>
        ) : (
          <FormButton
            disabled={buttonDisable}
            onClick={handleSubmitButton}
            text={"Signup"}
          ></FormButton>
        )}
      </div>
    </div>
  );
}
