import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import { toast, useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { user } from "@/stores/atom/user";
export default function QrPay({ username, userId }) {
  const url = `http://localhost:5173/user/${username}?id=${userId}`;
  const [loggedUserId, setLoggedUserId] = useState("");
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const userInfo = useRecoilValueLoadable(user);
  const setUserInfo = useSetRecoilState(user);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function user() {
      if (!localStorage.getItem("token")) {
        return;
      }
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/user/validUser`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setLoggedUserId(res.data.userId);
    }
    user();
  }, []);
  const onModalHandler = () => {
    setOpen(true);
  };
  const onHomeClick = () => {
    if (loggedUserId) {
      navigate("/dashboard");
    } else {
      toast({
        variant: "destructive",
        description: `You are not logged in!`,
        action: (
          <div className="">
            <button
              onClick={() => navigate("/login")}
              className="bg-light text-dark px-2 rounded-md mt-.5  border-stone-600 border-[3px]"
            >
              Login
            </button>
          </div>
        ),
      });
    }
  };
  const onPayHandler = async () => {
    setDisabled(true);
    if (!loggedUserId) {
      toast({
        variant: "destructive",
        description: `You are not logged in!`,
        action: (
          <div className="">
            <button
              onClick={() =>
                navigate("/login", { state: `/user/${username}?id=${userId}` })
              }
              className="bg-light text-dark px-2 rounded-md mt-.5  border-stone-600 border-[3px]"
            >
              Login
            </button>
          </div>
        ),
      });
      setDisabled(false);
      return;
    }
    if (userId == loggedUserId) {
      toast({
        variant: "destructive",
        description: `Sender and receiver can't be same!`,
      });
      setDisabled(false);
      return;
    }
    try {
      const transfer = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/transaction/transfer`,
        { receiver: userId, amount: parseInt(amount) },
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
      setDisabled(false);
      setOpen(false);
    }
  };
  return (
    <>
      <div className="bg-dark h-[95%] md:w-[70%] xl:w-[40%] w-[90%] rounded-lg flex flex-col items-center justify-around py-10 relative">
        <div className="flex flex-col justify-center items-center">
          <QRCodeCanvas value={url} size={200} />
          <p className="text-stone-400 text-lg mt-5">@{username}</p>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={onModalHandler}
            className="px-4 py-1 text-stone-950 bg-light rounded-md"
          >
            Pay
          </button>
        </div>
        <button className="absolute top-[7%] left-7">
          <HomeIcon
            onClick={onHomeClick}
            className="h-9 w-9 text-neutral-200"
          />
        </button>
      </div>
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
