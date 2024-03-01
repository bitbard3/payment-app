import React, { useState } from "react";
import CardValue from "./CardValue";
import { useRecoilValueLoadable } from "recoil";
import { user } from "@/stores/atom/user";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { toast, useToast } from "@/components/ui/use-toast";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export default function Card({}) {
  const [disabled, setDisabled] = useState(false);
  const userAtomLoadable = useRecoilValueLoadable(user);
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const onPayHandler = async () => {
    setDisabled(true);
    if (!amount || amount < 0) {
      toast({
        variant: "destructive",
        description: `Invalid Amount`,
      });
    } else if (parseFloat(amount) == parseInt(amount)) {
      try {
        const addMoney = await axios.post(
          "https://payment-app-topaz.vercel.app/api/v1/transaction/addMoney",
          { amount: parseInt(amount) },
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        setUserInfo((prev) => ({
          ...prev,
          balance: prev.balance + parseInt(amount),
        }));
        toast({
          variant: "success",
          description: `Money added successfully`,
        });
        setAmount("");
      } catch (error) {
        toast({
          variant: "destructive",
          description: `Something went wrong`,
        });
      } finally {
        setOpen(false);
        setDisabled(false);
      }
    } else {
      toast({
        variant: "destructive",
        description: `Cant add money in decimal`,
      });
      setAmount("");
      setDisabled(false);
    }
  };
  return (
    <div className="flex md:justify-around justify-center items-center px-5 h-full">
      <div className="flex flex-col justify-center items-center md:h-4/5 md:w-[40%] bg-dark w-[60%] h-[85%] xl:w-[20%] xl:h-[75%] lg:h-[70%] lg:w-[35%] rounded-xl py-8  delay-100 relative">
        <p className="text-neutral-400 text-base md:text-lg">Balance</p>
        <CardValue
          value={
            userAtomLoadable.state === "loading"
              ? null
              : userAtomLoadable.contents.balance
          }
        ></CardValue>
        <div className="absolute top-4 right-4">
          <button onClick={() => setOpen(true)} className="hover:scale-110">
            <PlusCircleIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="md:flex flex-col items-center justify-center md:h-4/5 md:w-[40%] bg-dark w-[50%] xl:w-[20%] xl:h-[75%] h-full lg:h-[70%] lg:w-[35%] rounded-xl py-8  delay-100 hidden">
        <p className="text-neutral-400 text-base md:text-lg">Transactions</p>
        <CardValue
          value={
            userAtomLoadable.state === "loading"
              ? null
              : userAtomLoadable.contents.transactionsLength
          }
        ></CardValue>
      </div>
      <div className="xl:flex flex-col items-center justify-center md:h-4/5 md:w-[20%] bg-dark w-[50%] xl:w-[20%] xl:h-[75%] lg:h-[70%] lg:w-[35%] h-full rounded-xl py-8  delay-100 hidden">
        <p className="text-neutral-400 text-base md:text-lg">Friends</p>
        <CardValue
          value={
            userAtomLoadable.state === "loading"
              ? null
              : userAtomLoadable.contents.friendsLength
          }
        ></CardValue>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Amount</DialogTitle>
            <DialogDescription>Enter an amount less than 10k</DialogDescription>
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
    </div>
  );
}
