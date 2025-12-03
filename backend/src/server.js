import express from "express";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();
const { PORT, NODE_ENV } = ENV;
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
// GLOBAL ERROR HANDLER (Add this BEFORE start or server.listen)
app.use((err, req, res, next) => {
  console.error("🔥 INTERNAL ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err?.message,
  });
});

if (NODE_ENV === "production") {
  // Use process.cwd() so path resolution works reliably on Render
  const staticPath = path.join(process.cwd(), "frontend", "dist");

  app.use(express.static(staticPath));

  // universal fallback for SPA routes — safe on all Node/Express versions
  app.use((req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connectDB();
});
