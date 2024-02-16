import React from "react";
import MoneyUser from "./MoneyUser";

export default function MoneyUserList({ users }) {
  return (
    <div className="w-full grid grid-cols-10 mt-3 px-3 text-light  gap-5 text-sm md:text-base">
      {users.map((user, index) => {
        return (
          <MoneyUser
            index={index + 1}
            firstName={user.firstName}
            lastName={user.lastName}
          ></MoneyUser>
        );
      })}
    </div>
  );
}
