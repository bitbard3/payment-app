import React, { useState } from "react";
import MoneyUser from "./MoneyUser";
import { useRecoilState } from "recoil";
import { user } from "@/stores/atom/user";
import { toast, useToast } from "@/components/ui/use-toast";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export default function MoneyUserList() {
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [friend, setFriend] = useState("");
  const [disabled, setDisabled] = useState(false);
  const onModalHandler = (friendId) => {
    setOpen(true);
    setFriend(friendId);
  };
  const onPayHandler = async () => {
    setDisabled(true);
    try {
      const transfer = await axios.post(
        "https://payment-app-red.vercel.app/api/v1/transaction/transfer",
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
      setDisabled(false);
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
    <div className="w-full grid grid-cols-10 mt-3 px-3 text-light  gap-5 text-sm md:text-base">
      {userInfo.friendsInfo
        .slice()
        .reverse()
        .map((user, index) => {
          return (
            <MoneyUser
              index={index + 1}
              firstName={user.firstName}
              lastName={user.lastName}
              key={user._id}
              onModalHandler={() => onModalHandler(user._id)}
            ></MoneyUser>
          );
        })}

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
    </div>
  );
}
