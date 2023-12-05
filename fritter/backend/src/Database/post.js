import { database } from "./configDB.js";
import { getFriends } from "./friends.js";
import { alreadyMember } from "./members.js";
const postExists = async (postID) => {
  const [verify] = await database.query(`select * from posts where post_id=?`, [
    postID,
  ]);
  if (verify.length != 0) {
    //post exists
    return true;
  }
  return false;
};
const getPosts = async (postIDs) => {
  // console.log(postIDs);
  let ids = "(";
  postIDs.forEach((id) => {
    ids = ids.concat(`'${id}',`);
  });
  ids = ids.substring(0, ids.length - 1);
  ids = ids.concat(")");
  const [posts] = await database.query(
    // `select posts.*, images.link from posts left join images ON posts.post_id = images.post_id where posts.post_id IN ${ids} order by created_at Desc;`
    `SELECT
    posts.*,
    images.link,
    users.username ,
    COALESCE(likes_count, 0) AS total_likes,
    COALESCE(comments_count, 0) AS total_comments
FROM
    posts
LEFT JOIN
    images ON posts.post_id = images.post_id
LEFT JOIN
    users ON posts.creator_id = users.user_id
LEFT JOIN
    (
        SELECT
            post_id,
            COUNT(*) AS likes_count
        FROM
            likes
        GROUP BY
            post_id
    ) AS likes_info ON posts.post_id = likes_info.post_id
LEFT JOIN
    (
        SELECT
            post_id,
            COUNT(*) AS comments_count
        FROM
            comments
        GROUP BY
            post_id
    ) AS comments_info ON posts.post_id = comments_info.post_id
WHERE
    posts.post_id IN ${ids}
ORDER BY
    posts.created_at DESC;
`
    // `select * from posts where post_id IN ${ids} order by created_at Desc`
  );
  return posts;
};
export const createPost = async (postDetails) => {
  await database.query(`insert into posts(creator_id, content) values(?,?)`, [
    postDetails.creator_id,
    postDetails.content,
  ]);
  return {message:"Creation Successful"};
};
export const deletePost = async (postID) => {
  if (!(await postExists(postID))) {
    //not a member
    return { message: "Not a valid post id" };
  }

  await database.query(`delete from posts where post_id=?`, [postID]);
  return {message: "Deleted Successfully"};
};
export const getPostID = async (userID,content)=>{
  const [postID]=await database.query('select post_id from posts where creator_id=? and content=? order by created_at Desc',[userID,content]);
  return postID[0].post_id;
}
export const updatePost = async (postID, updateColumns, updateData) => {
  //two arrays, order is important
  //modify columns for query
  let data = "";
  for (let i = 0; i < updateColumns.length; i++) {
    data = data.concat(updateColumns[i] + "='" + updateData[i] + "',");
  }
  data = data.substring(0, data.length - 1);

  await database.query(`Update posts Set ${data} where post_id=?`, [postID]);
};

const getPostIDSUser = async (userID) => {
  const [postIDs] = await database.query(
    `select * from posts where creator_id=? order by created_at Desc`,
    [userID.user_id]
  );
  const postIDsArr = [];
  postIDs.forEach((postObj) => {
    postIDsArr.push(postObj.post_id);
  });
  return postIDsArr;
};
const getPostIDSUserProfile = async (userID) => {
  const [postIDs] = await database.query(
    `select * from posts where creator_id=? order by created_at Desc`,
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
  const [deletePosts]= await database.query(`SELECT DISTINCT pp.post_id
FROM page_posts pp
JOIN posts p ON pp.post_id = p.post_id
JOIN (
    SELECT user_id, friend_id FROM friends
    UNION
    SELECT friend_id, user_id FROM friends
) f ON p.creator_id = f.friend_id
LEFT JOIN members m ON pp.page_id = m.page_id AND f.user_id = m.user_id
WHERE f.user_id = ? 
  AND m.user_id IS NULL;`,[userID])
  // console.log(deletePosts);
  const idsToRemove=[]
  deletePosts.forEach(id=>{
    idsToRemove.push(id.post_id);
  })
  // console.log(idsToRemove)
  const friends = await getFriends(userID);
  // console.log(friends);
  const postIDsTemp = [];
  for (let i = 0; i < friends.length; i++) {
    postIDsTemp.push(await getPostIDSUser(friends[i]));
  }
  const postIDs = [];
  postIDsTemp.forEach((arr) => {
    arr.forEach((id) => {
      if(!(idsToRemove.includes(id))){
        postIDs.push(id);
        // next;
      }
    });
  });
  const [postsPages]=await database.query(`SELECT posts.post_id
FROM members
JOIN pages ON members.page_id = pages.page_id
JOIN page_posts ON pages.page_id = page_posts.page_id
JOIN posts ON page_posts.post_id = posts.post_id
WHERE members.user_id = ?; -- Replace 'my_user_id' with the actual user ID
`,[userID]);
// console.log(postsPages);
postsPages.forEach(id=>{
  const tempId=id.post_id;
  console.log(tempId);
  // if(! (postIDs.includes(tempId))){
    postIDs.push(tempId);
  // }
})
  let postsToGet = [...new Set(postIDs)];
  const posts = await getPosts(postsToGet);
  // console.log(posts);
  return posts;

  // friends.forEach(id=>{
  // posts.push(await getPostIDSUser(id))
  // })
};
export const getPostsProfile = async (userID) => {
  //get all posts by user
  const postIDs = await getPostIDSUserProfile(userID);
  const posts = await getPosts(postIDs);
  // console.log(posts);
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
      posts.forEach((id) => {
        ids.push(id.post_id);
      });
      return ids;
    };
    export const getPostsPageWithValidation = async (userID, pageID) => {
      //check if user is a member
      if (!(await alreadyMember(userID, pageID))) {
      //   //not a user
        return {message:"Not a member of the specified page"};
      }
      //then get all the posts on the page from page_posts
      //get all posts on a page
      // const [postIds] = await database.query(
        // `select posts.*, pages.title, images.link from pages join page_posts ON page_posts.page_id = pages.page_id join posts ON posts.post_id = page_posts.post_id Left join images ON posts.post_id=images.post_id where pages.page_id=? order by created_at Desc;`,
        // [pageID]
      // );
      const postIds=await getPostsPage(pageID);
      // console.log(postIds);
      return (await getPosts(postIds));
    };
    // console.log(await getPostsProfile('user1'));
    // console.log(getPostsPageWithValidation('user1',))
    