const getPosts = (req, res) => {
  //get list of posts one can view
  //can be by user or page
  //search those post by time descending and return
  res.send("all posts");
};
const getPost = (req, res) => {
  //verify if user can get the post and open post
  res.send("post: " + req.params.id);
};
const createPost = (req, res) => {
  res.send("create post");
};
const updatePost = (req, res) => {
  res.send("update post");
};
const deletePost = (req, res) => {
  res.send("delete post");
};

module.exports = { getPost, getPosts, createPost, updatePost, deletePost };
