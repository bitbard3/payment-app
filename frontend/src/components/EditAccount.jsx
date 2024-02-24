import React, { useState } from "react";
import EditAccountHeader from "./EditAccountHeader";
import EditAccountInput from "./EditAccountInput";
import EditAccountButton from "./EditAccountButton";
import { useRecoilState } from "recoil";
import { user } from "@/stores/atom/user";
import axios from "axios";
import { toast, useToast } from "@/components/ui/use-toast";

export default function EditAccount() {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const { toast } = useToast();
  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const onClickHandler = async () => {
    try {
      await axios.put(
        "http://localhost:3000/api/v1/user",
        {
          firstName,
          lastName,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setUserInfo((prev) => ({
        ...prev,
        firstName: firstName,
        lastName: lastName,
      }));
      toast({
        variant: "success",
        description: `Account updated successfully`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: `Something went wrong!`,
      });
    }
  };
  return (
    <div className="bg-dark md:w-[70%] w-[90%] h-[95%] rounded-2xl flex flex-col items-center justify-center">
      <EditAccountHeader></EditAccountHeader>
      <div className="w-[80%] md:pl-10 h-[70%] flex flex-col justify-center gap-10 px-3 md:px-8 mt-16">
        <EditAccountInput
          disabled={true}
          label={"Username"}
          type={"text"}
          id={"usernameId"}
        ></EditAccountInput>
        <EditAccountInput
          disabled={false}
          value={firstName}
          label={"First Name"}
          type={"text"}
          id={"firstNameId"}
          onChange={onFirstNameChange}
        ></EditAccountInput>{" "}
        <EditAccountInput
          disabled={false}
          value={lastName}
          label={"Last Name"}
          type={"text"}
          id={"LastNameId"}
          onChange={onLastNameChange}
        ></EditAccountInput>
        <EditAccountButton onClick={onClickHandler}></EditAccountButton>
      </div>
    </div>
  );
}
