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
        <DialogTitle>Friend Requests</DialogTitle>
        <DialogDescription>
          Add friends to quickly send them payments without the hassle to search
          them
        </DialogDescription>
      </DialogHeader>
      <AddFriendRequestList></AddFriendRequestList>
    </DialogContent>
  );
}
