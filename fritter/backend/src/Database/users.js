import {database} from "./configDB.js";

//verify user
const userExists = async (userID) => {
  const [verify] = await database.query(
    `select * from users where user_id=?`,
    [userID]
  );
  if (verify.length != 0) {
    //user exists
    return true;
  }
  return false;
};
//get profle
const getUser = async (userID) => {
    if(! await userExists(userID)){
        return {message:"does not exist"};
    }
  const [user] = await database.query(
    `select * from users where user_id=?`,
    [userID]
  );
  return user[0];
};
//create user
const createUser = async (userDetails)=>{
    await database.query(
    `insert into users(user_id, username, password, disp_img_link) values(?,?,?,?)`,
    [userDetails.user_id,userDetails.username,userDetails.password,userDetails.disp_img_link]
  );    
}
//update user
const updateUser = async (userID, updateColumns, updateData)=>{
    //two arrays, order is important
    //modify columns for query
    let data= "";
    for(let i=0;i<updateColumns.length;i++){
        data = data.concat(updateColumns[i] + "=\'" + updateData[i] + "\',");
    }
    data=data.substring(0,data.length-1);
    
  await database.query(`Update users Set ${data} where user_id=?`,[userID])

}
//login details
const userLogin = async (userID)=>{
    //check if user exists
    if(! await userExists(userID)){
        return 'Does not exist';
    }

    const [user]=await database.query(`select password from users where user_id=?`,[userID]);
    return user[0].password;
}
// const [val]=await connection.query("select * from users");
// console.log(await createUser({user_id:'user9',username:'Shayan',password:'pass123',disp_img_link:'null'}));
