import { database } from "./configDB.js";
//
export const getMessagesCount =async (userID) =>{
    const [msgs] = await database.query(
    `select count(*) as count from messages group by sender_id having sender_id =?`,
    [userID]
  );
    // console.log(msgs);
    return (msgs.length<1?0:msgs[0].count);
//   return msgs[0].count;
}
//create comment
export const sendMsg = async (senderID, receiverID, content) => {
//   if (await alreadyLiked(userID, postID)) {
    //already liked output msg and return
    // console.log("liked");
    // return;
//   }
  await database.query(`insert into messages(sender_id,receiver_id,content) values(?,?,?)`, [
    senderID,
    receiverID, content
  ]);
};
//get comments-post
export const getMsgs = async (senderID, receiverID) => {
  const [msgs] = await database.query(
    `select sender_id,content,sent_date from messages where sender_id=? AND receiver_id=? OR sender_id=? AND receiver_id=? order by sent_date ASC`,
    [senderID, receiverID, receiverID, senderID]
  );
//   let ids = "(";
//   commentIds.forEach((obj) => {
//     ids = ids.concat(`'${obj.comment_id}',`)
//     // ids.push(obj.comment_id);
//   });
//   ids = ids.substring(0, ids.length - 1);
//   ids = ids.concat(")");
//   //get the comments
//   const [comments] = await database.query(
//     `select * from comments where comments.comment_id IN ${ids} order by created_at Desc;`
//     // `select * from posts where post_id IN ${ids} order by created_at Desc`
//   );
  return msgs;
};

//delete comment
// export const deleteComment = async (commentID) => {
// //   if (!(await alreadyLiked(userID, postID))) {
//     // not liked output msg and return
//     // console.log("not liked");
//     // return;
// //   }
//   await database.query(`delete from comments where comment_id=?`, [
//     commentID
//   ]);
// };

// console.log(await getMsgs('user2','user1'));