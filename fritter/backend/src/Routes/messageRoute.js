const express = require("express");
const { getMessages, sendMessage } = require("../Controllers/messageContoller");
// const { getMessages, sendMessage } = require("../Controllers/messageController");
const { auth } = require("../Middlewares/auth");
const messageRouter = express.Router();

messageRouter.get("/friend=:id", auth, getMessages);
// messageRouter.get("/:id", auth, getPost);
messageRouter.post("/", auth, sendMessage);
// postRouter.put("/:id", auth,updatePost);
// postRouter.delete("/:id", auth,deletePost)

module.exports = { messageRouter };
