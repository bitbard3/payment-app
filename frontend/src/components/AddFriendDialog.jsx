import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddFriendRequestList from "./AddFriendRequestList";

export default function AddFriendDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <div className="">
            <p>Friend Requests</p>
          </div>
        </DialogTitle>
        <DialogDescription>
          <div className="">
            <p>
              Add friends to quickly send them payments without the hassle to
              search them
            </p>
          </div>
        </DialogDescription>
      </DialogHeader>
      <AddFriendRequestList></AddFriendRequestList>
    </DialogContent>
  );
}
