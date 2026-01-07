import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound.jsx";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore.js";
const ChatsList = () => {
  const { getAllChatPartners, chats, isUserLoading, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getAllChatPartners();
  }, [getAllChatPartners]);

  if (isUserLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;
  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="w-full p-3 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/50 last:border-0"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={chat.profilePic || "/avatar.png"}
                alt={chat.fullname}
                className="w-full h-full object-cover"
              />
            </div>
            {onlineUsers.includes(chat._id) && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-background" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <h4 className="font-medium text-foreground truncate">
                {chat.fullname}
              </h4>
              {/* Optional: Add time here if available in chat object */}
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {/* Optional: Add last message preview here */}
              Click to chat
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
