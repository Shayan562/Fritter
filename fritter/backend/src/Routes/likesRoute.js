import express from 'express';
// import {  newPost, editPost, delPost, feed, profile, page } from "../Controllers/postController.js";
import { auth } from "../Middlewares/auth.js";
import { likesCount, newLike, unLike, userLikeStatus } from '../Controllers/likeController.js';
export const likesRouter = express.Router();

likesRouter.get("/:postid", auth, likesCount);//user feed

likesRouter.get("/status=:postid", auth, userLikeStatus);//user feed
// postRouter.get("/:pageid", auth, pageComplete);//user profile
// postRouter.get("/search=:name", auth, findPage);//user profile
likesRouter.post("/", auth,newLike);
// postRouter.put("/:pageid", auth,editPage);
likesRouter.delete("/:postid", auth,unLike)