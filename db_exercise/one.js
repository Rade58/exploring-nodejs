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
const getBonkByInfo = async (info) => {
  // ON THE PLACE OF ? AN PROVIDED
  // ARGUMENT IS GOING TO BE PASSED
  const result = await SQL3.get(/* sql */`
    SELECT * FROM Bonk WHERE info = ?
  `,
  info)

  return result
}


// METHOD FOR INSERTING RECORD INTO DB
const insertBonk = async (info) => {

  // AGAIN, ? MEANS THE SAME AS ABOVE
  return SQL3.run(/* sql */`
    INSERT INTO Bonk (info) VALUES (?) 
  `,
  info
  )

}



// LETS TRY IT
// WE SHOULD GET undefined BECAUSE WE DIDN'T INSERT ANY RECORDS
getBonkByInfo("foobar")
  .then( async record => {
    // THIS SHOULD BE undefined
    console.log({record})

    // LETS INSERT IT
    await insertBonk("Shibetoshi Nakato")

    // LETS SEE IF RECORD IS INSERTED
    // LETS PASS INVALID STRING UNPURPOSE
    const rec1 = await getBonkByInfo("Suzuki Nakamoto")

    // THIS SHOULD BE undefined
    console.log({rec1})


    const rec2 = await getBonkByInfo("Shibetoshi Nakato")
    // THIS SHOULD BE OUR RECORD
    console.log({rec2})
  })
