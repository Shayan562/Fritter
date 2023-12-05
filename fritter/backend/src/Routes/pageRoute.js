import express from 'express';
// import {  newPost, editPost, delPost, feed, profile, page } from "../Controllers/postController.js";
import { auth } from "../Middlewares/auth.js";
import { delPage, editPage, explorePages, findPage, joinPage, leavePage, newPage, pageComplete, pageInfo, pagesForUser } from '../Controllers/pageController.js';
export const pageRouter = express.Router();

pageRouter.get("/joined",auth, pagesForUser)
pageRouter.get("/explore",auth, explorePages)
pageRouter.get("/info:pageid", auth, pageInfo);//user feed
pageRouter.get("/:pageid", auth, pageComplete);//user profile
pageRouter.get("/search=:name", auth, findPage);//user profile
pageRouter.post("/", auth,newPage);
pageRouter.post("/join",auth,joinPage);
pageRouter.delete("/leave/:pageid",auth,leavePage);
pageRouter.put("/:pageid", auth,editPage);
pageRouter.delete("/:pageid", auth,delPage)