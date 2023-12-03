import { database } from "./configDB.js";


export const getImage=async (userID,postID)=>{
    const [img] = await database.query(
    `select link from images where user_id=? AND post_id=?`,
    [userID, postID]
  );
  return (img.length<1?null:img[0].link)
}
//create
export const createImage=async (imgData)=>{
    await database.query(`insert into images(user_id,post_id,link) values(?,?,?)`, [
    imgData.user_id,
    imgData.post_id,
    imgData.link
  ]);
};

//edit
export const updateImage = async (userID, postID, updateColumns, updateData) => {
  //two arrays, order is important
  //modify columns for query
  let data = "";
  for (let i = 0; i < updateColumns.length; i++) {
    data = data.concat(updateColumns[i] + "='" + updateData[i] + "',");
  }
  data = data.substring(0, data.length - 1);

  await database.query(`Update images Set ${data} where user_id=? AND post_id=?`, [userID,postID]);
};
//delete
export const deleteImage = async(user_id,post_id)=>{
await database.query(`delete from images where user_id=? AND post_id=?`, [
    user_id,
    post_id,
  ]);
}

// console.log(await deleteImage('user1','p1'));