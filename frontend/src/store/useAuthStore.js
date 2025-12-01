import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      if (res.data) {
        set({ authUser: res.data });
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
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      console.error("Error during signup:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  isLoggingIn: false,
  login: async (formData) => {
    try {
      set({ isLoggingIn: true });
      const res = await axios.post("/auth/login", formData);
      set({ authUser: res.data });
      toast.success("Logged In Successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to Login, Please try later"
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
    } catch (error) {
      toast.error("Logout failed");
      console.error("Error during logout:", error);
    }
  },
}));
