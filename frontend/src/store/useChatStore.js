import { create } from "zustand";
import { useAuthStore } from "./useAuthStore.js";

import { axiosInstance } from "../lib/axios.js";

import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",
  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set((state) => ({ isSoundEnabled: !state.isSoundEnabled }));
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to fetch the contacts"
      );
    } finally {
      set({ isUserLoading: false });
    }
  },
  getAllChatPartners: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to fetch the chats");
      console.error("Error fetching chat partners:", error);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to fetch the messages"
      );
      console.error("Error fetching messages:", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (msgData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();
    const tempId = `temp-${Date.now()}`;
    const OptimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: msgData.text,
      image: msgData.image || null,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };
    set((state) => ({ messages: [...state.messages, OptimisticMessage] }));
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        msgData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      set({
        messages: messages.filter((msg) => msg._id !== tempId),
      });
      toast.error(
        error.response?.data?.message || "Unable to send the message"
      );
      console.error("Error sending message:", error);
    }
  },
  messageListener: null,
  subscribeToNewMessages: () => {
    const { selectedUser, messageListener } = get();
    if (!selectedUser || messageListener) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    const handler = (newMessage) => {
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });

      if (get().isSoundEnabled) {
        const notificationSound = new Audio("/sounds/notification.mp3");
        notificationSound.currentTime = 0;
        notificationSound.play().catch((e) => {
          console.log("Audio play failed", e);
        });
      }
    };

    socket.on("newMessage", handler);
    set({ messageListener: handler });
  },
  unsubscribeFromNewMessages: () => {
    const { messageListener } = get();
    const socket = useAuthStore.getState().socket;
    if (!socket || !messageListener) return;

    socket.off("newMessage", messageListener);
    set({ messageListener: null });
  },
}));
