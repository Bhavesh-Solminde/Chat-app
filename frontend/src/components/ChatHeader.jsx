import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = selectedUser?._id
    ? onlineUsers.includes(String(selectedUser._id))
    : false;
  const handleXClick = () => {
    setSelectedUser(null);
  };
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setSelectedUser(null);
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center border-b border-border max-h-[84px] px-6 py-4 flex-1">
      <div className="flex items-center space-x-3">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img
              src={selectedUser?.profilePic || "/avatar.png"}
              alt={selectedUser?.fullname || "Selected contact"}
            />
          </div>
        </div>
        <div>
          <h3 className="text-foreground font-medium">
            {selectedUser?.fullname || "Select a chat"}
          </h3>
          <p className="text-muted-foreground text-sm">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <button onClick={handleXClick}>
        <XIcon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatHeader;
