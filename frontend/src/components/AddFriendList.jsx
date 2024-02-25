import React, { useState, useEffect } from "react";
import AddFriend from "./AddFriend";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { user } from "@/stores/atom/user";
import { toast, useToast } from "@/components/ui/use-toast";
export default function AddFriendList({ friends }) {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [filterFriends, setFilterFriends] = useState(friends);
  const { toast } = useToast();
  useEffect(() => {
    const filteredFriends = friends.filter(
      (friend) =>
        !userInfo.sentFriendRequests.includes(friend._id) &&
        !userInfo.friendsInfo.some((info) => info._id === friend._id) &&
        !userInfo.friendRequestsInfo.some((info) => info._id === friend._id)
    );
    setFilterFriends(filteredFriends);
  }, [
    friends,
    userInfo.sentFriendRequests,
    userInfo.friendsInfo,
    userInfo.friendRequestsInfo,
  ]);
  const onClickHandler = async (friendId) => {
    try {
      const sendFriendReq = await axios.post(
        "http://localhost:3000/api/v1/user/addFriendRequest",
        { friend: friendId },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setFilterFriends((prev) => prev.filter((user) => user._id !== friendId));
      setUserInfo((prev) => ({
        ...prev,
        sentFriendRequests: [...prev.sentFriendRequests, friendId],
      }));
      toast({
        variant: "success",
        description: `Friend request sent!`,
      });
    } catch (error) {}
  };
  return (
    <>
      {friends.length > 0 ? (
        <div className="w-full grid grid-cols-10 mt-3 px-3 text-light gap-5 text-sm md:text-base">
          {filterFriends.map((friend, index) => (
            <AddFriend
              key={friend._id}
              index={index + 1}
              firstName={friend.firstName}
              lastName={friend.lastName}
              onAddClick={() => onClickHandler(friend._id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <p className="text-2xl text-light">Search user</p>
        </div>
      )}
    </>
  );
}
