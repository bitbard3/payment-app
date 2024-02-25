import React from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddFriendDialog from "./AddFriendDialog";

export default function HeaderPopover() {
  return (
    <div className="flex flex-col gap-3">
      <Dialog>
        <DialogTrigger>
          <button className="text-light border-b-[1px] text-sm md:text-base border-neutral-400 pb-3">
            Friend Requests
          </button>
        </DialogTrigger>
        <AddFriendDialog></AddFriendDialog>
      </Dialog>
      <button className="text-light text-sm md:text-base  border-neutral-400 pb-1">
        Logout
      </button>
    </div>
  );
}
