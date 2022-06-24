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
    exec: promisify(myDB.exec.bind(myDB)),

    // I ADDED myDB HERE ALSO
    myDB,

  }



  // DEFINED SOME HELPERS HERE ALSO

  const getBonkByInfo = async (info: string) => {
    
    const result = await SQL3.get(/* sql */`
      SELECT * FROM Bonk WHERE info = ?
    `,
    // @ts-ignore
    info)

    return result
  }


  const insertBonk = async (info: string) => {

    return SQL3.run(/* sql */`
      INSERT INTO Bonk (info) VALUES (?) 
    `,
    // @ts-ignore
    info
    )

  }

  const getShibaByBonkInfo = async (bonkInfo: string) => {
    
    return SQL3.get(/* sql */`
      SELECT * FROM Shiba
      LEFT JOIN Bonk 
      ON Shiba.bonkId = Bonk.id
      WHERE Bonk.info = ?
    `,
    // @ts-ignore
    bonkInfo)

  }

  const insertShiba = async (info: string, bonkId: number) => {

    return SQL3.run(/* sql */`
      INSERT INTO Shiba (info, bonkId) VALUES (?, ?)
    `
    // @ts-ignore
    , info, bonkId)
  }

  const getAllRecords = async () => {
    return SQL3.all(/* sql */`
      SELECT
        Shiba.info AS 'shiba',
        Bonk.info AS 'bonk'
      FROM
        Shiba JOIN Bonk
        ON (Shiba.bonkId = Bonk.id)
      ORDER BY
        Bonk.id DESC, Shiba.info ASC
    `)
  }

  // APPEND THESE METHODS ON THE OBJECT
  // WE ARE GOING TO USE AS CLIENT

   const client = {
      ...SQL3, 
      getAllRecords,
      insertShiba, 
      getShibaByBonkInfo,
      insertBonk,
      getBonkByInfo
    }


  // TIS WS HERE BEFORE, WE ARE RUNNING INITIL SQL
  await client.exec(initSql)

  
  console.log("database started");


  return client

}


export default initDB