import { getPostsFeed } from "../Database/post.js";

export const feed =async (req, res) => {
  // res.send(req.Headers.id);

  // res.send(await getPostsFeed(req.headers.id));
  res.send(await getPostsFeed(req.headers.id));

  //get list of posts one can view
  //can be by user or page
  //search those post by time descending and return
  // res.send("all posts");
};
export const getPost = (req, res) => {
  //verify if user can get the post and open post
  res.send("post: " + req.params.id);
};
export const createPost = (req, res) => {
  res.send("create post");
};
export const updatePost = (req, res) => {
  res.send("update post");
};
export const deletePost = (req, res) => {
  res.send("delete post");
};

// module.exports = { getPost, getPosts, createPost, updatePost, deletePost };
