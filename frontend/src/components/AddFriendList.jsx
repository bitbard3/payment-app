import React, { useState, useEffect } from "react";
import AddFriend from "./AddFriend";
import axios from "axios";
import { useRecoilState } from "recoil";
import { user } from "@/stores/atom/user";
import { toast, useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export default function AddFriendList({ friends }) {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [filterFriends, setFilterFriends] = useState(friends);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [friend, setFriend] = useState("");
  const [disabled, setDisabled] = useState(false);
  const onModalHandler = (friendId) => {
    setOpen(true);
    setFriend(friendId);
  };
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
        `${import.meta.env.VITE_URL}/api/v1/user/addFriendRequest`,
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
    } catch (error) {
      toast({
        variant: "destructive",
        description: `Something went wrong!`,
      });
    }
  };
  const onPayHandler = async () => {
    setDisabled(true);
    try {
      const transfer = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/transaction/transfer`,
        { receiver: friend, amount: parseInt(amount) },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setUserInfo((prev) => ({
        ...prev,
        balance: prev.balance - parseInt(amount),
        transactionsLength: prev.transactionsLength + 1,
        transactions: [...prev.transactions, transfer.data.transactionInfo[0]],
      }));
      toast({
        variant: "success",
        description: `Money transfered successfully`,
      });
    } catch (error) {
      if (error.response.status == 400) {
        toast({
          variant: "destructive",
          description: `Not sufficient balance!`,
        });
      } else if (error.response.status == 422) {
        toast({
          variant: "destructive",
          description: `Not valid amount`,
        });
      } else {
        toast({
          variant: "destructive",
          description: `Something went wrong!`,
        });
      }
    } finally {
      setOpen(false);
      setDisabled(false);
    }
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
              onModalHandler={() => onModalHandler(friend._id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <p className="text-2xl text-light">Search user</p>
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Amount</DialogTitle>
            <DialogDescription>
              Enter an amount to send to your friend
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full md:justify-around justify-between mt-5">
            <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              className="border border-dark py-2 md:px-3 px-2 rounded-md"
              placeholder="Enter an amount"
            />
            <button
              onClick={onPayHandler}
              disabled={disabled}
              className="border md:px-10 disabled:bg-stone-600 flex items-center px-5 bg-stone-900 text-light rounded-md"
            >
              {disabled && (
                <div
                  className="animate-spin  mr-3 inline-block size-5 border-[3px] border-current border-t-transparent rounded-full"
                  role="status"
                  aria-label="loading"
                ></div>
              )}
              Pay
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
