import express from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../controllers/auth.controllers.js";

const Router = express.Router();

Router.post("/signup", signupController);

Router.post("/login", loginController);
Router.post("/logout", logoutController);

export default Router;
