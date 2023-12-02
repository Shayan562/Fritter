// const express = require("express");

import express from 'express';
import { getPost, createPost, updatePost, deletePost, feed } from "../Controllers/postController.js";
import { auth } from "../Middlewares/auth.js";
export const postRouter = express.Router();

postRouter.get("/feed", auth, feed);
postRouter.get("/profile/:id", auth, getPost);
postRouter.post("/", auth,createPost);
postRouter.put("/:id", auth,updatePost);
postRouter.delete("/:id", auth,deletePost)

// module.exports = { postRouter };
