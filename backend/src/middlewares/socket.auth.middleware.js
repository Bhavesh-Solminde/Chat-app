import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import { User } from "../models/User.js";

export async function socketAuthMiddleware(socket, next) {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      return next(new Error("Unauthorized: No token provided"));
    }
    // Verify token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return next(new Error("Unauthorized: Invalid token"));
    }

    // Fetch user from database
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return next(new Error("Unauthorized: User not found"));
    }

    // Attach user info to socket object for later use (just like req.user in HTTP)
    socket.user = user;
    socket.userId = user._id.toString();
    next();
  } catch (error) {
    console.error("Error in socketAuthMiddleware:", error);
    return next(new Error("Unauthorized: Authentication failed"));
  }
}
