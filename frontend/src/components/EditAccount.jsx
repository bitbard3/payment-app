import React, { useState, useEffect } from "react";
import EditAccountHeader from "./EditAccountHeader";
import EditAccountInput from "./EditAccountInput";
import EditAccountButton from "./EditAccountButton";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { user } from "@/stores/atom/user";
import axios from "axios";
import { toast, useToast } from "@/components/ui/use-toast";
import AccountView from "./AccountView";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function EditAccount() {
  const userInfo = useRecoilValueLoadable(user);
  const setUserInfo = useSetRecoilState(user);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const { toast } = useToast();
  const [editAccount, setEditAccount] = useState(false);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (userInfo.state !== "loading") {
      setFirstName(userInfo.contents.firstName);
      setLastName(userInfo.contents.lastName);
    }
  }, [userInfo]);
  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const onClickHandler = async () => {
    setDisabled(true);
    try {
      await axios.put(
        "https://payment-app-topaz.vercel.app/api/v1/user",
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
      setDisabled(false);
      toast({
        variant: "destructive",
        description: `Something went wrong!`,
      });
    } finally {
      setDisabled(false);
    }
  };
  return (
    <div className="bg-dark relative md:w-[70%] w-[90%] h-[95%] rounded-2xl flex flex-col items-center justify-center">
      {!editAccount ? (
        <>
          <AccountView></AccountView>
          <button
            onClick={() => setEditAccount(true)}
            className="absolute bottom-5 z-10 md:bottom-10 px-4 rounded-md py-1.5 text-light border border-purple"
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setEditAccount(false)}
            className="absolute z-10 top-7 left-7"
          >
            <ChevronLeftIcon className="h-6 w-6 text-white " />
          </button>
          <EditAccountHeader></EditAccountHeader>
          <div className="w-[80%] md:pl-10 h-[70%] flex flex-col justify-center gap-10 px-3 md:px-8 mt-16">
            <EditAccountInput
              disabled={true}
              value={
                userInfo.state == "loading" ? null : userInfo.contents.username
              }
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
            <EditAccountButton
              disabled={disabled}
              onClick={onClickHandler}
            ></EditAccountButton>
          </div>
        </>
      )}
    </div>
  );
}
