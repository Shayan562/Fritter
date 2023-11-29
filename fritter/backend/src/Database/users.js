import {connection} from "./configDB.js";

const [val]=await connection.query("select * from users");
console.log(val);
