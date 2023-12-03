import { database } from "./configDB.js";
//
export const getCommentsCount =async (postID) =>{
    const [comments] = await database.query(
    `select count(*) as count from comments group by post_id having post_id =?`,
    [postID]
  );
  //   console.log(likes);
  return comments[0].count;
}
//create comment
export const createComment = async (userID, postID, body) => {
//   if (await alreadyLiked(userID, postID)) {
    //already liked output msg and return
    // console.log("liked");
    // return;
//   }
  await database.query(`insert into comments(creator_id, post_id, body) values(?,?,?)`, [
    userID,
    postID, body
  ]);
};
//get comments-post
export const getComments = async (postID) => {
  const [comments] = await database.query(
    `select users.username,comments.* from comments join
    users on comments.creator_id=users.user_id
    where comments.post_id=? order by created_at DESC`,
    [postID]
  );
  return comments;
  // let ids = "(";
  // commentIds.forEach((obj) => {
  //   ids = ids.concat(`'${obj.comment_id}',`)
  // });
  // ids = ids.substring(0, ids.length - 1);
  // ids = ids.concat(")");
  // //get the comments
  // const [comments] = await database.query(
  //   `select * from comments where comments.comment_id IN ${ids} order by created_at Desc;`
  // );
  // return comments;
};

//delete comment
export const deleteComment = async (commentID) => {
//   if (!(await alreadyLiked(userID, postID))) {
    // not liked output msg and return
    // console.log("not liked");
    // return;
//   }
  await database.query(`delete from comments where comment_id=?`, [
    commentID
  ]);
};

// console.log(await getComments('post1'));
// 