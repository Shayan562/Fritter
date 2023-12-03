import express from 'express';
// import {  newPost, editPost, delPost, feed, profile, page } from "../Controllers/postController.js";
import { auth } from "../Middlewares/auth.js";
import { commentCount, delComment, newComment, viewComments } from '../Controllers/commentController.js';
export const commentsRouter = express.Router();

commentsRouter.get("/count:postid", auth, commentCount);
commentsRouter.get("/:postid", auth, viewComments);//user feed
// postRouter.get("/:pageid", auth, pageComplete);//user profile
// postRouter.get("/search=:name", auth, findPage);//user profile
commentsRouter.post("/", auth,newComment);
// postRouter.put("/:pageid", auth,editPage);
commentsRouter.delete("/:commentid", auth,delComment)