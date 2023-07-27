const express = require("express");
const Router = express.Router();

const {
  register,
  login,
  authAdmin,
  createusers,
  Getusers,
  Getusersbyid,
  updateusers,
  Deleteusers
} = require("../Controllers/adminController");

Router.post("/register", register);
Router.post("/login", login);
Router.post("/users", authAdmin, createusers);
Router.get("/users", authAdmin, Getusers);
Router.get("/users/:id", authAdmin, Getusersbyid);
Router.put("/users/:id", authAdmin, updateusers);
Router.delete("/users/:id", authAdmin, Deleteusers);
module.exports = Router;
