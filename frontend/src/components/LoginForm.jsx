import React, { useState } from "react";
import FormButton from "./FormButton";
import FormTitle from "./FormTitle";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import FormInput from "./FormInput";
import { toast, useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { formSchema } from "@/validation/form.validation";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ url }) {
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisable, setbuttonDisable] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const onLoginHandler = async () => {
    setbuttonDisable(true);
    const validData = formSchema
      .pick({ username: true, password: true })
      .safeParse({ username: username, password: password });
    if (!validData.error) {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/user/login",
          {
            username,
            password,
          }
        );
        const token = res.data.token;
        localStorage.setItem("token", `Bearer ${token}`);
        if (url) {
          navigate(url);
        } else {
          navigate("/dashboard");
        }
        toast({
          variant: "success",
          description: `Logged in succesfully`,
        });
      } catch (error) {
        if (error.response.status == 403) {
          toast({
            variant: "destructive",
            description: `Account doesn't exist or Password is incorrect!`,
          });
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
  const testLoginHandler = async () => {
    setbuttonDisable(true);
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/login", {
        username: "test",
        password: "1234",
      });
      const token = res.data.token;
      localStorage.setItem("token", `Bearer ${token}`);
      if (url) {
        navigate(url);
      } else {
        navigate("/dashboard");
      }
      toast({
        variant: "success",
        description: `Logged in succesfully`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setbuttonDisable(false);
    }
  };
  return (
    <div className="h-[80%] md:h-[70%] w-[90%] md:w-2/3 lg:w-[60%] xl:w-1/3 xl:h-[80%] border relative border-stone-500 border-opacity-80 rounded-lg py-20 form">
      <div className="flex flex-col justify-around items-center h-full">
        <FormTitle title={"Login!"}></FormTitle>
        <div className="flex mt-14 md:mt-20 w-6/12 justify-around">
          <div
            className={`rounded-full border bg-purple border-light p-1.5 hover:scale-110 duration-200`}
          >
            <EnvelopeIcon className="h-6 text-neutral-200"></EnvelopeIcon>
          </div>
        </div>
        <>
          {" "}
          <FormInput
            placeholder="Username"
            type="text"
            mt="mt-20"
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
        <div className="h-[30%] w-1 my-5"></div>
      </div>
      <div className="ml-auto absolute right-[13%] bottom-[5%] md:bottom-[10%]">
        <FormButton
          disabled={buttonDisable}
          onClick={onLoginHandler}
          text={"Login"}
        ></FormButton>
      </div>
      <div className="ml-auto absolute left-[13%] bottom-[5%] md:bottom-[10%]">
        <FormButton
          disabled={buttonDisable}
          onClick={testLoginHandler}
          text={"Test"}
        ></FormButton>
      </div>
    </div>
  );
}
