import React from "react";
import { useChatStore } from "../store/useChatStore";
const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="w-full p-4">
      <div className="flex items-center p-1 bg-muted rounded-lg">
        <button
          onClick={() => setActiveTab("chats")}
          className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === "chats"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Chats
        </button>
        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === "contacts"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Contacts
        </button>
      </div>
    </div>
  );
};

export default ActiveTabSwitch;
