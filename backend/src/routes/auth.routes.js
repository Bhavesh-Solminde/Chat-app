import express from "express";
import {
  signupController,
  loginController,
  logoutController,
  updateProfileController,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";
import { ENV } from "../lib/env.js";

const Router = express.Router();

Router.use(
  ENV.NODE_ENV === "production" ? arcjetProtection : (req, res, next) => next()
);

Router.post("/signup", signupController);

Router.post("/login", loginController);
Router.post("/logout", logoutController);

Router.put("/update-profile", protectRoute, updateProfileController);

Router.get("/check", protectRoute, (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
});
export default Router;
