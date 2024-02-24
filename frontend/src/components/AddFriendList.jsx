import React from "react";
import AddFriend from "./AddFriend";

export default function AddFriendList({ friends }) {
  return (
    <>
      {friends.length > 0 ? (
        <div className="w-full grid grid-cols-10 mt-3 px-3 text-light gap-5 text-sm md:text-base">
          {friends.map((friend, index) => {
            return (
              <AddFriend
                key={index}
                index={index + 1}
                firstName={friend.firstName}
                lastName={friend.lastName}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <p className="text-2xl text-light">Search user</p>
        </div>
      )}
    </>
  );
}
