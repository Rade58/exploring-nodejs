const {createWriteStream} = require('fs')

getRecords()

function getRecords(){

  import("node-fetch").then(async ({default: fetchData}) => {
  
    try {
      
    const { body} = await fetchData("http://localhost:8066/records")

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
  
  })
}
