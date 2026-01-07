import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader.jsx";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder.jsx";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton.jsx";

const ChatContainer = () => {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToNewMessages,
    unsubscribeFromNewMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const contactName = selectedUser?.fullname || "your contact";
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
    subscribeToNewMessages();
    //cleanup on unmount or when selectedUser changes
    return () => {
      unsubscribeFromNewMessages();
    };
  }, [
    selectedUser?._id,
    getMessagesByUserId,
    subscribeToNewMessages,
    unsubscribeFromNewMessages,
  ]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => {
              const isSender = msg.senderId === authUser?._id;
              return (
                <div
                  key={msg._id}
                  className={`flex flex-col ${
                    isSender ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm relative ${
                      isSender
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-secondary text-secondary-foreground rounded-bl-none"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="rounded-lg max-h-60 object-cover mb-2"
                      />
                    )}
                    {msg.text && (
                      <p
                        className={`text-sm leading-relaxed ${
                          msg.image ? "mt-1" : ""
                        }`}
                      >
                        {msg.text}
                      </p>
                    )}
                    <div
                      className={`text-[10px] mt-1 flex justify-end opacity-70`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={contactName} />
        )}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default ChatContainer;
