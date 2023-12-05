import express from 'express';
import { getMessages, sendMessage } from "../Controllers/messageContoller.js";
import { auth } from "../Middlewares/auth.js";
export const messageRouter = express.Router();

messageRouter.get("/:id", auth, getMessages);
messageRouter.post("/", auth, sendMessage);
