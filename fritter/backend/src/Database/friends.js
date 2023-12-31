import { database } from "./configDB.js";

const alreadyFriends = async (val1, val2) => {
  const [verify] = await database.query(
    `select * from friends where user_id=? AND friend_id=?`,
    [val1, val2]
  );
  if (verify.length != 0) {
    //both are friends
    return true;
  }
  return false;
};

export const notFriends = async (userID)=>{
  const [result] = await database.query(
    `select * from users where user_id!=? `,
    [userID]
  );
  const ids = [];
  result.forEach((obj) => {
      ids.push(obj.user_id);
  });
  let friendids = "(";
  ids.forEach((id) => {
    return friendids = friendids.concat(`'${id}',`);
  });
  friendids = friendids.substring(0, friendids.length - 1);
  friendids = friendids.concat(")");
  const [friends] = await database.query(`select user_id,username from users
  where user_id in ${friendids}`)
  return friends;
}

export const getFriends = async (userID) => {
  const [result] = await database.query(
    `select * from friends where user_id=? OR friend_id=?`,
    [userID, userID]
  );
  const ids = [];
  result.forEach((obj) => {
    if (obj.user_id === userID) {
      ids.push(obj.friend_id);
    } else {
      ids.push(obj.user_id);
    }
  });
  let friendids = "(";
  ids.forEach((id) => {
    friendids = friendids.concat(`'${id}',`);
  });
  friendids = friendids.substring(0, friendids.length - 1);
  friendids = friendids.concat(")");
  const [friends] = await database.query(`select user_id,username from users
  where user_id in ${friendids}`)
  return friends;
};

export const addFriends = async (userID, friendID) => {
  let val1, val2;
  if (userID < friendID) {
    val1 = userID;
    val2 = friendID;
  } else {
    val1 = friendID;
    val2 = userID;
  }
  //cheking if already friends
  if (await alreadyFriends(val1, val2)) {
    //already friends output msg and return
    // console.log("friends");
    return {message:'already friends'};
  }
  // console.log(`Inserting ${val1} and ${val2}`);
  await database.query(`insert into friends(user_id, friend_id) values(?,?)`, [
    val1,
    val2,
  ]);
  return {message:'added friend'};
};

export const removeFriends = async (userID, friendID) => {
  let val1, val2;
  if (userID < friendID) {
    val1 = userID;
    val2 = friendID;
  } else {
    val1 = friendID;
    val2 = userID;
  }
  //checking if they are friends
  if (!(await alreadyFriends(val1, val2))) {
    //not friends so cant unfriend
    return {message:"not friends"};
  }
  await database.query(`delete from friends where user_id=? AND friend_id=?`, [
    val1,
    val2,
  ]);
  return {message:"unfriended"}
};
// console.log(await setFriends("user4","user1"));
// console.log(await getFriends("user1"));
// console.log(await removeFriends("user1","user4"));
// console.log(await getFriends("user4"));
// export const setFriends =
