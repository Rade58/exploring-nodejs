import path from 'path'
import express from 'express'
import initClient from './db'
import seed from './seed'

const PORT = 8066;

const WEB_FILES_PATH = path.join(__dirname, "/web_files")

console.log(WEB_FILES_PATH)

const app = express();

async function makeRoutes(){

  const client = await initClient()

  await seed(client)
  

  app.use(express.static(WEB_FILES_PATH, {
    setHeaders(res){
      res.setHeader("Server", "Shibatoshi Nakamoto Workshop")
    },
    // index: ["index.html"],  
  }))

  // app.get("/shiba", async (req, res) => {
    // res.sendFile(path.join(__dirname, "/web_files", "/shiba.html"))
  // })
  //
  
  // THIS IS CUSTOM ROUTING MIDDLEWARE
  // YOU USE match PROVIDED BY STRING PROTOTYPE
  app.use(async (req, res, next) => {

    // DOING SOME REWRITES
    
    if (/^\/(?:index\/?)?(?:[?#].*$)?$/.test(req.url)) {
      req.url = "/index.html";
    }
    // NOT A REWRITE
    else if (/^\/js\/.+$/.test(req.url)) {
      next();
      return;
    }
    else if (/^\/(?:[\w\d]+)(?:[\/?#].*$)?$/.test(req.url)) {
      // @ts-ignore
      const [,basename] = req.url.match(/^\/([\w\d]+)(?:[\/?#].*$)?$/);
      req.url = `${basename}.html`;
    }

    next();
  })


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