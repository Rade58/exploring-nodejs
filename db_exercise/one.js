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



const getBonkByInfo = async (info) => {
  
  const result = await SQL3.get(/* sql */`
    SELECT * FROM Bonk WHERE info = ?
  `,
  info)

  return result
}


const insertBonk = async (info) => {

  return SQL3.run(/* sql */`
    INSERT INTO Bonk (info) VALUES (?) 
  `,
  info
  )

}

const getShibaByBonkInfo = async (bonkInfo) => {
  
  return SQL3.get(/* sql */`
    SELECT * FROM Shiba
    LEFT JOIN Bonk 
    ON Shiba.bonkId = Bonk.id
    WHERE Bonk.info = ?
  `,
  bonkInfo)

}

const insertShiba = async (info, bonkId) => {

  return SQL3.run(/* sql */`
    INSERT INTO Shiba (info, bonkId) VALUES (?, ?)
  `, info, bonkId)
}

// LETS DEFINE GETING ALL RECORDS FUNCTION
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





getBonkByInfo("foobar")
  .then( async record => {

    console.log({record})

    await insertBonk("Shibetoshi Nakato")

    const rec1 = await getBonkByInfo("Suzuki Nakamoto")

    console.log({rec1})

    const rec2 = await getBonkByInfo("Shibetoshi Nakato")

    console.log({rec2})

    await insertShiba("Hello World", 1)

    const rec3 = await getShibaByBonkInfo("Shibetoshi Nakato")

   console.log({rec3})
  
    // LETS FIRST ADD BUNCH OF RECORDS
    await insertBonk("Shibetoshi Nakato zero")
    await insertBonk("Shibetoshi Nakato one")
    await insertBonk("Shibetoshi Nakato two")
    await insertBonk("Shibetoshi Nakato three")
    await insertBonk("Shibetoshi Nakato four")

    await insertShiba("Hello World", 1)
    await insertShiba("Hello World", 2)
    await insertShiba("Hello World", 3)
    await insertShiba("Hello World", 4)
    const fiveInsert = await insertShiba("Hello World", 5)

    console.log({fiveInsert})

    // LETS GET ALL RECORDS
    const all = await getAllRecords()

    // LETS USE console.table
    console.table(all)


  })



