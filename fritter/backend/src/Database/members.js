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

export const addMember = async (userID, pageID, role=null) => {
  //check if already a member
  if (await alreadyMember(userID, pageID)) {
    //already member
    return;
  }
  const newRole=(role==null?'member':role);
  //check if the page exists
  await database.query(`insert into members(user_id,page_id,role) values(?,?,?)`, [
    userID,
    pageID,
    newRole
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
export const memberOf=async(userID)=>{
  const [pages]=await database.query(`select * from members where user_id=?`,userID);
  return pages;
}
// console.log(await memberOf('user1'));
// console.log(await removeMember("user1", "page5"));
