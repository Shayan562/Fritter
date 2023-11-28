const mysql= require('mysql2/promise');

// const config = 
const config={
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "db4free.net",
    user: "shayan562",
    password: "admin123",
    database: "fritter",
    connectTimeout: 60000
  },
//   listPerPage: 10,
};

const fun = async(ras)=>{
  const con = await mysql.createConnection(config.db);
  console.log('Before execute');
const result = await con.execute("Select * from users");
// console.log('After execute', result);
  // const [result,] = await con.execute("Select * from users where user_id='shayan'");
  // await pool.query("Select * from users");
  

  // console.log(  result[0]) ;
  return result[0];
}
const val =fun(123);
console.log(val);

// console.log(fun());
// module.exports = config;