const path = require("path")
const {readFileSync} = require("fs")
const {promisify} = require("util");
const {Database} = require("sqlite3")

const DB_PATH = path.join(__dirname,"my.db");
const DB_SQL_PATH = path.resolve(__dirname, "../mydb.sql");
const initSql = readFileSync(DB_SQL_PATH, "utf-8");

let SQL3;

async function main(){
  
  const myDB = new Database(DB_PATH);

  SQL3 = {
    run(...args){
      return new Promise((res, rej) => {
        myDB.run(...args, function (err) {
          if(err) rej(err);
          else res(this)
        })
      })
    },
    get: promisify(myDB.get.bind(myDB)),
    all: promisify(myDB.all.bind(myDB)),
    exec: promisify(myDB.exec.bind(myDB))
  }


  await SQL3.exec(initSql)

}

main()


// LETS DEFINE METHOD FOR GETTING ONE RECORD BY info FIELD
const getShibaByInfo = async (infoVal) => {
  // ON THE PLACE OF ? AN PROVIDED
  // ARGUMENT IS GOING TO BE PASSED
  const result = await SQL3.get(`
    SELECT id FROM Shiba WHERE info = ?
  `)

  return result
}


// LETS TRY IT
getShibaByInfo("foobar")
  .then(record => {
    console.log({record})
  })






