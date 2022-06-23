const path = require("path")
const {promisify} = require("util");

const DB_PATH = path.join(__dirname,"my.db");

const DB_SQL_PATH = path.resolve(__dirname, "mydb.sql")

console.log(DB_SQL_PATH)

