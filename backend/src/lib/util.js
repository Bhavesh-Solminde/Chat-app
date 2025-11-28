import jwt from "jsonwebtoken";

export function generateToken(userId, res) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ id: userId }, jwtSecret, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true, // prevent XSS attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production", // use secure cookies in production
  });

  return token;
}
