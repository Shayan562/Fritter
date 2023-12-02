import { database } from "./configDB.js";
import { addMember } from "./members.js";
import { deletePost, getPostsPage } from "./post.js";

//check page exists
const pageExists = async (pageID) => {
  const [verify] = await database.query(
    `select * from pages where page_id=?`,
    [pageID]
  );
  if (verify.length != 0) {
    //page exists
    return true;
  }
  return false;
};
//create page
const createPage = async (pageDetails)=>{
    await database.query(
    `insert into pages(creator_id, title) values(?,?)`,
    [pageDetails.creator_id,pageDetails.title]
  );
  const [pageID] =await database.query(`select page_id from pages where creator_id=? AND title=? order by page_id Desc`,[pageDetails.creator_id,pageDetails.title])
  await addMember(pageDetails.creator_id,pageID[0].page_id,'admin');
}
//update page
const updatePage = async (pageID, updateColumns, updateData)=>{
    //two arrays, order is important
    //modify columns for query
    let data= "";
    for(let i=0;i<updateColumns.length;i++){
        data = data.concat(updateColumns[i] + "=\'" + updateData[i] + "\',");
    }
    data=data.substring(0,data.length-1);
    
  await database.query(`Update pages Set ${data} where page_id=?`,[pageID])

}
//get page details
const getPage = async (pageID) => {
    if(! await pageExists(pageID)){
        return {message:"does not exist"};
    }
  const [page] = await database.query(
    `select * from pages where page_id=?`,
    [pageID]
  );
  return page[0];
};
//delete page
export const deletePage = async (pageID) => {
  //check if page exists
  if (!(await pageExists(pageID))) {
    //not a page
    return {message:'page does not exist'};
  }
  //deleteing posts on pages
  const postIds = await getPostsPage(pageID);
  for(let i=0;i<postIds.length;i++){
    await deletePost(postIds[0]);
  }

//deleting page
  await database.query(`delete from pages where page_id=?`, [
    pageID,
  ]);
//   await database.query(`delete from members where page_id=?`, [
//     pageID,
//   ]);
//   const [postIds]=await da()
//   await database.query(`delete from page_posts where page_id=?`, [
//     pageID,
//   ]);
//   await k
  // await database.query(`insert into members(user_id,page_id) values(?,?)`, [userID, pageID]
  //   );
};
console.log(await deletePage('page3'));