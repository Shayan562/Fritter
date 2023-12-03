// const express = require("express");

import express from 'express';
import {  newPost, editPost, delPost, feed, profile, page } from "../Controllers/postController.js";
import { auth } from "../Middlewares/auth.js";
export const postRouter = express.Router();

postRouter.get("/feed", auth, feed);//user feed
postRouter.get("/profile/", auth, profile);//user profile
postRouter.get("/page/:pageid",auth, page);//specific page
postRouter.post("/", auth,newPost);
postRouter.put("/:postid", auth,editPost);
postRouter.delete("/:postid", auth,delPost)

// module.exports = { postRouter };
