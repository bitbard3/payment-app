import { user } from "@/stores/atom/user";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import AddFriendRequest from "./AddFriendRequest";
import axios from "axios";
import { toast, useToast } from "@/components/ui/use-toast";
import friendReq from "../images/friendReq.svg";
export default function AddFriendRequestList() {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [filteredFriends, setFilterFriends] = useState([]);
  const { toast } = useToast();
  useEffect(() => {
    setFilterFriends(userInfo.friendRequestsInfo);
  }, [userInfo.friendRequestsInfo]);
  const onAddHandler = async (friendId, friendReq) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/user/addFriend`,
        { friend: friendId },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const updatedFriendRequestsInfo = filteredFriends.filter(
        (item) => item._id != friendId
      );
      setUserInfo((prev) => ({
        ...prev,
        friendRequestsInfo: updatedFriendRequestsInfo,
        friendsInfo: [...prev.friendsInfo, friendReq],
        friendsLength: prev.friendsLength + 1,
      }));
      toast({
        variant: "success",
        description: `Friend added successfully!`,
      });
    } catch (error) {}
  };
  const onRemoveHandler = async (friendId) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/user/removeFriendRequest`,
        { friend: friendId },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const updatedFriendRequestsInfo = filteredFriends.filter(
        (item) => item._id != friendId
      );
      setUserInfo((prev) => ({
        ...prev,
        friendRequestsInfo: updatedFriendRequestsInfo,
      }));
      toast({
        variant: "default",
        description: `Friend request removed!`,
      });
    } catch (error) {}
  };
  return (
    <>
      {filteredFriends.length > 0 ? (
        <div className="flex flex-col mt-5 italic">
          {filteredFriends.map((friendReq) => {
            return (
              <AddFriendRequest
                key={friendReq._id}
                firstName={friendReq.firstName}
                lastName={friendReq.lastName}
                onAddHandler={() => onAddHandler(friendReq._id, friendReq)}
                onRemoveHandler={() => onRemoveHandler(friendReq._id)}
              ></AddFriendRequest>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center h-full flex-col items-center gap-y-10">
          <p className="text-dark font-semibold">No friend requests</p>
          <img src={friendReq} className="h-1/2" alt="" />
        </div>
      )}
    </>
  );
}
