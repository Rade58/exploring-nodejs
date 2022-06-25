import path from 'path'
import express from 'express'
import initClient from './db'
import seed from './seed'

const PORT = 8066;

// THIS IS A ABSOLUTE PATH WHERE ARE STATIC
// FILES ARE PLACED
const WEB_FILES_PATH = path.join(__dirname, "/web_files")

console.log(WEB_FILES_PATH)

const app = express();

async function makeRoutes(){

  const client = await initClient()

  await seed(client)
  

  // WE CAN DEFINE SERVING OF STATIC FILES WITH EXPRESS
  // LIKE THIS
  // WE NEED TO PROVIDE
  app.use(express.static(WEB_FILES_PATH, {
    setHeaders(res){
      res.setHeader("Server", "Shibatoshi Nakamoto Workshop")
    },
    // index: ["index.html"],  
  }))

  // I WAS GETTING ERROR WHEN VISITING /shiba
  // SO I MANAGED TO DEFINE SERVING OF OTHER FILES
  // THAT AREN'T index.html, LIKE THIS
  app.get("/shiba", async (req, res) => {
    res.sendFile(path.join(__dirname, "/web_files", "/shiba.html"))
  })
  // 

  app.get("/records",async (req,res) => {

    try {

      const records = await client.getAllRecords()

      res.setHeader("Content-Type", "application/json")
      res.setHeader("Cache-Control", "no-cache")

      return res.status(200).json({records})

    }catch(err){

      console.error(err);
      return res.status(500).send("Something went wrong!")

    }

  })

  
  app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`)
  })

}


makeRoutes()