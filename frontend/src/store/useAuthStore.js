import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      const user = res.data?.user;
      if (user) {
        set({ authUser: user });
        get().connectSocket();
      } else {
        set({ authUser: null });
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  isSigningUp: false,
  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      console.error("Error during signup:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  isLoggingIn: false,
  login: async (formData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(
        error.response?.data?.message || "Unable to login, please try later"
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Logout failed");
      console.error("Error during logout:", error);
    }
  },
  isUpdatingProfile: false,
  updateProfile: async (updatedData) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth/update-profile", updatedData);
      const updatedUser = res.data?.updatedUser;
      if (updatedUser) {
        set({ authUser: updatedUser });
      }
      toast.success(res.data?.message || "Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
      console.error("Error updating profile:", err);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  socket: null,
  onlineUsers: [],
  connectSocket: () => {
    const { authUser } = get();
    const existing = get().socket;
    if (!authUser || existing?.connected || existing?.active) return;

    const socketInstance = io(BASE_URL, { withCredentials: true });
    socketInstance.connect();
    set({ socket: socketInstance });

    //listen for online users event
    socketInstance.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const socketInstance = get().socket;
    if (!socketInstance) return;

    socketInstance.off("getOnlineUsers");
    socketInstance.disconnect();
    set({ socket: null, onlineUsers: [] });
  },
}));
