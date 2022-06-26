import {createWriteStream} from 'fs'
import fetch from 'node-fetch'

getRecords()

async function getRecords(){

  try {

    const { body} = await fetch("http://localhost:8066/records")

    // TO BE SURE THAT WE GOT THE DATA LETS PIPE 
    //    body  WHIC IS A READABLE STREAM TO SOME FILE

    const writable = createWriteStream("cp/records.json")

    body?.pipe(writable)

    body?.once("end", () => {
      process.exitCode = 0
    })


  }catch(err){

    process.exitCode = 1
  }

}
