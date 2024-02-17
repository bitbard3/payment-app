import React from "react";
import EditAccountHeader from "./EditAccountHeader";
import EditAccountInput from "./EditAccountInput";
import EditAccountButton from "./EditAccountButton";

export default function EditAccount() {
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
          label={"First Name"}
          type={"text"}
          id={"firstNameId"}
        ></EditAccountInput>{" "}
        <EditAccountInput
          disabled={false}
          label={"Last Name"}
          type={"text"}
          id={"LastNameId"}
        ></EditAccountInput>
        <EditAccountButton></EditAccountButton>
      </div>
    </div>
  );
}
