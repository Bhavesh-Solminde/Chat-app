import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getAllChats,
} from "../controllers/message.controllers.js";
import { validateObjectId } from "../middlewares/validateObjectId.js";

const Router = express.Router();

Router.use(
  process.env.NODE_ENV === "production"
    ? arcjetProtection
    : (_, __, next) => next()
);
Router.use(protectRoute);

Router.get("/contacts", getAllContacts);
Router.get("/chats", getAllChats);
Router.get("/:id", validateObjectId("id"), getMessagesByUserId);
Router.post("/send/:id", validateObjectId("id"), sendMessage);

export default Router;
