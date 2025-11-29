import express from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../controllers/auth.controllers.js";

import { protectRoute } from "../middlewares/auth.middleware.js";

const Router = express.Router();

Router.post("/signup", signupController);

Router.post("/login", loginController);
Router.post("/logout", logoutController);

Router.put("/update-profile", protectRoute, updateProfileController);

Router.get("/check", protectRoute, (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
});
export default Router;
