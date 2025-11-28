import express from "express";

const Router = express.Router();

Router.get("/send", (req, res) => {
  res.send("Send message endpoint");
});

export default Router;
