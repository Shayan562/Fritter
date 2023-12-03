import express from 'express';
// import {  newPost, editPost, delPost, feed, profile, page } from "../Controllers/postController.js";
import { auth } from "../Middlewares/auth.js";
import { friendList,addFriend,unFriend } from '../Controllers/friendController.js';
export const friendsRouter = express.Router();

friendsRouter.get("/", auth, friendList);//user feed
friendsRouter.post("/", auth,addFriend);
friendsRouter.delete("/:friendid", auth,unFriend)