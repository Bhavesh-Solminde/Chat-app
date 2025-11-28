import jwt from "jsonwebtoken";

export function generateToken(userId, res) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
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
