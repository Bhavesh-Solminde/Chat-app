import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import path from "path";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
//bhaveshsolminde_db_user
//Yi3InUY9UOzz2xDu
//mongodb+srv://bhaveshsolminde_db_user:Yi3InUY9UOzz2xDu@cluster0.mw43ija.mongodb.net/?appName=Cluster0

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connectDB();
});
