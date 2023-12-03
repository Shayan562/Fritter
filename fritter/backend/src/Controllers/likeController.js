import {
  alreadyLiked,
  getLikesCount,
  removeLike,
  setLike,
} from "../Database/likes.js";

export const likesCount = async (req, res) => {
  const count = await getLikesCount(req.params.id);
  res.send({ LikesCount: count });
  //   res.send(await getPostsFeed(req.headers.id));
};
export const userLikeStatus = async (req, res) => {
  const status = await alreadyLiked(req.headers.id, req.params.postid);
  res.send({ userLikes: status });
};
export const newLike = async (req, res) => {
  const { creator_id, post_id } = req.body;
  await setLike(creator_id, post_id);
  res.send({ message: "Liked" });
};
export const unLike = async (req, res) => {
  const userID = req.headers.id;
  const postID = req.params.postid;
  await removeLike(userID, postID);
  res.send({ message: "unliked" });
};
