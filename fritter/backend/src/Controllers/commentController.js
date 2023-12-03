import { createComment, deleteComment, getComments, getCommentsCount } from "../Database/comments.js";

export const commentCount = async (req, res) => {
  const count = await getCommentsCount(req.params.postid);
  res.send({ commentsCount: count });
};
export const viewComments = async (req, res) => {
  const comments = await getComments(req.params.postid);
  res.send(comments);
  //   res.send(await getPostsFeed(req.headers.id));
};
export const newComment = async (req, res) => {
  const { creator_id, post_id, body } = req.body;
  await createComment(creator_id, post_id, body);
  res.send({ message: "created" });
};
export const delComment = async (req, res) => {
  const commentID = req.params.commentid;
  await deleteComment(commentID);
  res.send({ message: "deleted" });
};