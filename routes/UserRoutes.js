import express from "express";
import { getAllUser, login, signUp } from "../controllers/UserController.js";

const userrouter= express.Router();
userrouter.get("/", getAllUser);
userrouter.post("/signup", signUp);
userrouter.post("/login", login);

 export default userrouter;