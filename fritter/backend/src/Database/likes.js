import { database } from "./configDB.js";

const alreadyLiked = async (userID, postID) => {
  const [verify] = await database.query(
    `select * from likes where user_id=? AND post_id=?`,
    [userID, postID]
  );
  if (verify.length != 0) {
    //both are friends
    return true;
  }
  return false;
};
export const setLike = async (userID, postID) => {
  if (await alreadyLiked(userID, postID)) {
    //already liked output msg and return
    console.log("liked");
    return;
  }
  await database.query(`insert into likes(user_id, post_id) values(?,?)`, [
    userID,
    postID,
  ]);
};
export const removeLike = async (userID, postID) => {
  if (!(await alreadyLiked(userID, postID))) {
    //not liked output msg and return
    console.log("not liked");
    return;
  }
  await database.query(`delete from likes where user_id=? AND post_id=?`, [
    userID,
    postID,
  ]);
};
export const getLikesUser = async (userID) => {
  const [result] = await database.query(
    `select post_id from likes where user_id=?`,
    [userID]
  );
  const ids = [];
  result.forEach((obj) => {
    ids.push(obj.post_id);
  });
  return ids;
};
export const getLikesPost = async (postID) => {
  const [result] = await database.query(
    `select user_id from likes where post_id=?`,
    [postID]
  );
  const ids = [];
  result.forEach((obj) => {
    ids.push(obj.user_id);
  });
  return ids;
};
export const getLikesCount = async (postID) => {
  const [likes] = await database.query(
    `select count(*) as count from likes group by post_id having post_id =?`,
    [postID]
  );
  //   console.log(likes);
  return likes[0].count;
};

// console.log(await removeLike("user1", "post2"));
