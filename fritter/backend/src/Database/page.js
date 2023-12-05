import { database } from "./configDB.js";
import { addMember } from "./members.js";
import { deletePost, getPostsPage } from "./post.js";
//pages the user is apart of
// export const getUserPages = async (userID)=>{

// }
//check page exists
export const pageExists = async (pageID) => {
  const [verify] = await database.query(`select * from pages where page_id=?`, [
    pageID,
  ]);
  if (verify.length != 0) {
    //page exists
    return true;
  }
  return false;
};
//create page
export const createPage = async (pageDetails) => {
  await database.query(`insert into pages(creator_id, title) values(?,?)`, [
    pageDetails.creator_id,
    pageDetails.title,
  ]);
  const [pageID] = await database.query(
    `select page_id from pages where creator_id=? AND title=? order by page_id Desc`,
    [pageDetails.creator_id, pageDetails.title]
  );
  await addMember(pageDetails.creator_id, pageID[0].page_id, "admin");
};
//update page
export const updatePage = async (pageID, updateColumns, updateData) => {
  //two arrays, order is important
  //modify columns for query
  let data = "";
  for (let i = 0; i < updateColumns.length; i++) {
    data = data.concat(updateColumns[i] + "='" + updateData[i] + "',");
  }
  data = data.substring(0, data.length - 1);

  await database.query(`Update pages Set ${data} where page_id=?`, [pageID]);
};
//get page details
export const getPage = async (pageID) => {
  if (!(await pageExists(pageID))) {
    return { message: "does not exist" };
  }
  const [page] = await database.query(
    `select pages.*,users.username from pages join
    users on users.user_id=pages.creator_id where page_id=?`,
    [pageID]
  );
  return page[0];
};
//delete page
export const deletePage = async (pageID) => {
  //check if page exists
  if (!(await pageExists(pageID))) {
    //not a page
    return { message: "page does not exist" };
  }
  //deleteing posts on pages
  const postIds = await getPostsPage(pageID);
  for (let i = 0; i < postIds.length; i++) {
    await deletePost(postIds[0]);
  }

  //deleting page
  await database.query(`delete from pages where page_id=?`, [pageID]);
  //
};
export const exploreRandom = async(userID)=>{
  const [pages]=await database.query(`select page_id,title from pages join
    users on users.user_id=pages.creator_id where page_id not in(select page_id from members where user_id=?) Order By rand();`,[userID])
    return pages;
}
export const getPagesUserHasJoined = async (userID) => {
  const [pageIDs] =await database.query(
    `select page_id from members where user_id=?`,
    [userID]
  );
  const ids = [];
  pageIDs.forEach((page=>{
    ids.push(page.page_id)
  }))

  let searchIDs = "(";
  ids.forEach((id) => {
    searchIDs = searchIDs.concat(`'${id}',`);
  });
  searchIDs = searchIDs.substring(0, searchIDs.length - 1);
  searchIDs = searchIDs.concat(")");

  const [pages] = await database.query(
    `select pages.*,users.username from pages join
    users on users.user_id=pages.creator_id where page_id in ${searchIDs}`
    );
  return pages;
    // console.log(pages);

};
// console.log(await exploreRandom('user1'));
