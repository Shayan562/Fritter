import { database } from "./configDB.js";
//create new
export const addPagePostEntry = async (pageID, postID) => {
  //check if already a member
//   if (await alreadyMember(userID, pageID)) {
    //already member
    // return;
//   }
//   const newRole=(role==null?'member':role);
  //check if the page exists
  await database.query(`insert into page_posts(page_id,post_id) values(?,?)`, [
    pageID,
    postID
  ]);
};
// await addPagePostEntry('page2','p1');
//check page post
//delete page post
