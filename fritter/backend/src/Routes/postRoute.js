const express = require("express");
const { getPost, getPosts, createPost, updatePost, deletePost } = require("../Controllers/postController");
const { auth } = require("../Middlewares/auth");
const postRouter = express.Router();

postRouter.get("/", auth,getPosts);
postRouter.get("/:id", auth, getPost);
postRouter.post("/", auth,createPost);
postRouter.put("/:id", auth,updatePost);
postRouter.delete("/:id", auth,deletePost)

module.exports = { postRouter };
