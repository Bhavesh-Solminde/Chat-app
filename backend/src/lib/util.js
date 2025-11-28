import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export function generateToken(userId, res) {
  const { JWT_SECRET, NODE_ENV } = ENV;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true, // prevent XSS attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: "strict",
    secure: NODE_ENV === "production", // use secure cookies in production
  });

  return token;
}
