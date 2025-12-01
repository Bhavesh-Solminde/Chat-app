import React from "react";
import { useAuthStore } from "../store/useAuthStore";
const ChatPage = () => {
  const { logout } = useAuthStore();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="relative">
      <button
        onClick={handleLogout}
        className="btn btn-primary fixed top-4 right-4 z-50"
      >
        Logout
      </button>
      <h1>ChatPage</h1>
    </div>
  );
};

export default ChatPage;
