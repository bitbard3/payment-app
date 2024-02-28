import React from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddFriendDialog from "./AddFriendDialog";
import { useNavigate } from "react-router-dom";
import { toast, useToast } from "@/components/ui/use-toast";

export default function HeaderPopover() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast({
      variant: "default",
      description: `Logged out!`,
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <Dialog>
        <DialogTrigger>
          <div className="text-light border-b-[1px] text-sm md:text-base border-neutral-400 pb-3">
            Friend Requests
          </div>
        </DialogTrigger>
        <AddFriendDialog></AddFriendDialog>
      </Dialog>
      <button
        onClick={onLogoutHandler}
        className="text-light text-sm md:text-base  border-neutral-400 pb-1"
      >
        Logout
      </button>
    </div>
  );
}
