import { create } from "zustand";

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
  isSoundUnbled: localStorage.getItem("isSoundEnabled") === "true",
  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundUnbled);
    set((state) => ({ isSoundUnbled: !state.isSoundUnbled }));
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axios.get("/messages/contacts");
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
      const res = await axios.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to fetch the chats");
    } finally {
      set({ isUserLoading: false });
    }
  },
}));
