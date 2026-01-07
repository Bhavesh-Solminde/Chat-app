import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore.js";

const ContactList = () => {
  const { getAllContacts, allContacts, isUserLoading, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUserLoading) return <UsersLoadingSkeleton />;
  return (
    <div className="flex-1 overflow-y-auto">
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="w-full p-3 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/50 last:border-0"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={contact.profilePic || "/avatar.png"}
                alt={contact.fullname}
                className="w-full h-full object-cover"
              />
            </div>
            {onlineUsers.includes(contact._id) && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-background" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground truncate">
              {contact.fullname}
            </h4>
            <p className="text-sm text-muted-foreground truncate">
              {onlineUsers.includes(contact._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
