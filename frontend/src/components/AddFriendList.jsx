import React from "react";
import AddFriend from "./AddFriend";

export default function AddFriendList({ friends }) {
  return (
    <>
      <div className="w-full grid grid-cols-10 mt-3 px-3 text-light  gap-5 text-sm md:text-base">
        {friends.map((friend, index) => {
          return (
            <AddFriend
              index={index + 1}
              firstName={friend.firstName}
              lastName={friend.lastName}
            ></AddFriend>
          );
        })}
      </div>
    </>
  );
}
