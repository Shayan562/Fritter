import { database } from "./configDB.js";

export const alreadyMember = async (userID, pageID) => {
  const [verify] = await database.query(
    `select * from members where user_id=? AND page_id=?`,
    [userID, pageID]
  );
  console.log(verify);
  if (verify.length != 0) {
    //user is a member output msg and return
    return true;
  }
  return false;
};

export const addMember = async (userID, pageID) => {
  //check if already a member
  if (await alreadyMember(userID, pageID)) {
    //already member
    return;
  }
  //check if the page exists
  await database.query(`insert into members(user_id,page_id) values(?,?)`, [
    userID,
    pageID,
  ]);
};
export const removeMember = async (userID, pageID) => {
  //check if member
  if (!(await alreadyMember(userID, pageID))) {
    //not a member
    return;
  }

  await database.query(`delete from members where user_id=? AND page_id=?`, [
    userID,
    pageID,
  ]);
  // await database.query(`insert into members(user_id,page_id) values(?,?)`, [userID, pageID]
  //   );
};

// console.log(await removeMember("user1", "page5"));
