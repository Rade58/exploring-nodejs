import path  from "path"
import {readFileSync} from "fs"
import {promisify} from "util"
import {Database} from "sqlite3"

const DB_PATH = path.join(__dirname,"my.db");
const DB_SQL_PATH = path.resolve(__dirname, "mydb.sql");
const initSql = readFileSync(DB_SQL_PATH, "utf-8");


async function initDB(){
  
  const myDB = new Database(DB_PATH);

  const SQL3 = {
    run(sql: string){
      return new Promise((res, rej) => {
        myDB.run(sql, function (err) {
          if(err){

            return rej(err);
          } 
          return res(this);
        })
      })
    },
    get: promisify(myDB.get.bind(myDB)),
    all: promisify(myDB.all.bind(myDB)),
    exec: promisify(myDB.exec.bind(myDB))
  }


  await SQL3.exec(initSql)


  return SQL3

}

export default initDB