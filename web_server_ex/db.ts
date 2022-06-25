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
    run(...args: any){
      return new Promise((res, rej) => {
        // @ts-ignore
        myDB.run(...args, function (err) {
          if(err){

            return rej(err);
          } 
          // @ts-ignore
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

 
  // APPEND THESE METHODS ON THE OBJECT
  // WE ARE GOING TO USE AS CLIENT

  const client = {
      ...SQL3, 
      getBonkByInfo: async (info: string) => {
    
        const result = await SQL3.get(/* sql */`
          SELECT * FROM Bonk WHERE info = ?
        `,
        // @ts-ignore
        info)
    
        return result
      },
      insertBonk: async (info: string) => {
    
        return SQL3.run(/* sql */`
          INSERT INTO Bonk (info) VALUES (?) 
        `,
        // @ts-ignore
        info
        )
      },
      getShibaByBonkInfo: async (bonkInfo: string) => {
        
        return SQL3.get(/* sql */`
          SELECT * FROM Shiba
          LEFT JOIN Bonk 
          ON Shiba.bonkId = Bonk.id
          WHERE Bonk.info = ?
        `,
        // @ts-ignore
        bonkInfo)
      },
      insertShiba: (info: string, bonkId: number) => {
    
        return SQL3.run(/* sql */`
          INSERT INTO Shiba (info, bonkId) VALUES (?, ?)
        `
        // @ts-ignore
        , info, bonkId)
      },
      getAllRecords: async () => {
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
    
    }

  // TIS WS HERE BEFORE, WE ARE RUNNING INITIL SQL
  // 
  await SQL3.exec(initSql)
  
  console.log("database started");


  return client

}


export default initDB