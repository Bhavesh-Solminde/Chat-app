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
      const user = res.data?.user;
      if (user) {
        set({ authUser: user });
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
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
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
}));
