// const express = require("express");

import express from 'express';
import { getMessages, sendMessage } from "../Controllers/messageContoller.js";
// const { getMessages, sendMessage } = require("../Controllers/messageController");
import { auth } from "../Middlewares/auth.js";
export const messageRouter = express.Router();

messageRouter.get("/friend=:id", auth, getMessages);
// messageRouter.get("/:id", auth, getPost);
messageRouter.post("/", auth, sendMessage);
// postRouter.put("/:id", auth,updatePost);
// postRouter.delete("/:id", auth,deletePost)

// module.exports = { messageRouter };
