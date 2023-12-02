import { database } from "./configDB.js";
import { getFriends } from "./friends.js";
import { alreadyMember } from "./members.js";
const postExists = async(postID) =>{
  const [verify] = await database.query(
    `select * from posts where post_id=?`,
    [postID]
  );
  if (verify.length != 0) {
    //post exists
    return true;
  }
  return false;
}
const getPosts = async (postIDs) => {
  // console.log(postIDs);
  let ids = "(";
  postIDs.forEach((id) => {
    ids = ids.concat(`'${id}',`);
  });
  ids = ids.substring(0, ids.length - 1);
  ids = ids.concat(")");
  const [posts] = await database.query(
    `select posts.*, images.link from posts left join images ON posts.post_id = images.post_id where posts.post_id IN ${ids} order by created_at Desc;`
    // `select * from posts where post_id IN ${ids} order by created_at Desc`
  );
  return posts;
};
export const createPost = async (postDetails) =>{
  await database.query(
    `insert into posts(creator_id, content) values(?,?)`,
    [postDetails.creator_id,postDetails.content]
  ); 
}
export const deletePost = async (postID) => {
  if (!(await postExists(postID))) {
    //not a member
    return {message: 'Not a valid post id'};
  }

  await database.query(`delete from posts where post_id=?`, [
    postID,
  ]);
}
export const updatePost = async (postID, updateColumns, updateData) =>{
  //two arrays, order is important
    //modify columns for query
    let data= "";
    for(let i=0;i<updateColumns.length;i++){
        data = data.concat(updateColumns[i] + "=\'" + updateData[i] + "\',");
    }
    data=data.substring(0,data.length-1);
    
  await database.query(`Update posts Set ${data} where post_id=?`,[postID])
}

const getPostIDSUser = async (userID) => {
  const [postIDs] = await database.query(
    `select post_id from posts where creator_id=? order by created_at Desc`,
    [userID]
  );
  const postIDsArr = [];
  postIDs.forEach((postObj) => {
    postIDsArr.push(postObj.post_id);
  });
  return postIDsArr;
};
export const getPostsUser = async (userID) => {
  const [posts] = await database.query(
    `select * from posts where creator_id=? order by created_at Desc`,
    [userID]
  );
  return posts;
};
export const getPostsFeed = async (userID) => {
  const friends = await getFriends(userID);
  const postIDsTemp = [];
  for (let i = 0; i < friends.length; i++) {
    postIDsTemp.push(await getPostIDSUser(friends[i]));
  }
  const postIDs = [];
  postIDsTemp.forEach((arr) => {
    arr.forEach((id) => {
      postIDs.push(id);
    });
  });
  const posts = await getPosts(postIDs);
  // console.log(posts);
  return posts;

  // friends.forEach(id=>{
  // posts.push(await getPostIDSUser(id))
  // })
};
export const getPostsProfile = async (userID) => {
  //get all posts by user
  const postIDs = await getPostIDSUser(userID);
  const posts = await getPosts(postIDs);
  // console.log(posts);
  return posts;
};
export const getPostsPageWithValidation = async (userID, pageID) => {
  //check if user is a member
  if (!(await alreadyMember(userID, pageID))) {
    //not a user
    return;
  }
  //then get all the posts on the page from page_posts
  //get all posts on a page
  const [posts] = await database.query(
    `select posts.*, pages.title, images.link from pages join page_posts ON page_posts.page_id = pages.page_id join posts ON posts.post_id = page_posts.post_id Left join images ON posts.post_id=images.post_id where pages.page_id=? order by created_at Desc;`,
    [pageID]
  );
  return posts;
};
export const getPostsPage = async (pageID) => {
  //check if user is a member
  // if (!(await alreadyMember(userID, pageID))) {
  //   //not a user
  //   return;
  // }
  //then get all the posts on the page from page_posts
  //get all posts on a page
  const [posts] = await database.query(
    `select posts.post_id from pages join page_posts ON page_posts.page_id = pages.page_id join posts ON posts.post_id = page_posts.post_id where pages.page_id=?;`,
    [pageID]
  );
  const ids = [];
  posts.forEach(id=>{
    ids.push(id.post_id);
  })
  return ids;
};
// console.log(await getPostsPage('page1'));
