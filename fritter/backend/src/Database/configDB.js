import mysql from "mysql2"
export const database = mysql.createPool({
        /* don't expose password or any sensitive info, done only for demo */
        host: "localhost",
        user: "root",
        password: "root",
        database: "fritter"
      }).promise();
// module.exports={connection};
// import mysql from 'mysql2/promise'

// // const pool =
// // mysql.createPool(
// // {
// //     /* don't expose password or any sensitive info, done only for demo */
// //     host: "db4free.net",
// //     user: "shayan562",
// //     password: "admin123",
// //     database: "fritter",
// //     connectTimeout: 60000
// //   }
// // ).promise();

// const pool = mysql.createPool({
//     /* don't expose password or any sensitive info, done only for demo */
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "fritter"
//     // connectTimeout: 60000
//   }).promise();

// const fun =  (res) => {
//   const result = pool.query("Select * from users").then(user=>{
//     console.log (user[0]);
//   });

// };
// // setup();
// const res={};
// fun(res);
// console.log(res.body);
// const runQuery = async (query) =>{
//     const pool = mysql.createPool({
//         /* don't expose password or any sensitive info, done only for demo */
//         host: "localhost",
//         user: "root",
//         password: "root",
//         database: "fritter"
//         // connectTimeout: 60000
//       }).promise();
//       const val=await pool.query("Select * from users");
//       return(val[0]);
//     // const val=pool.query("Select * from users").then(res=>{
//       // console.log(res[0]);
//       // return res[0];
//     // })
//     // console.log(val);
//       // return ( await pool.query("Select * from users"));
//       // console.log(result[0]);

// }
// console.log(await runQuery());


// const result = runQuery();
// setTimeout(()=>{
  // console.log(result[0])
// },10000);
// console.log(runQuery());