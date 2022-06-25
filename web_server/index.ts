import {createServer} from 'http'
import type {IncomingMessage, ServerResponse} from 'http'
import initDB from './db'
import createFileServer from './file-server'


import seed from './seed'


const HTTP_PORT = 8066;

const fileServer = createFileServer()

async function initServer() {
  
  const client = await initDB()

  await seed(client)

  const httpServer = createServer(handler)
  
  httpServer.listen(HTTP_PORT, () => {
    console.log(`Server on poort ${HTTP_PORT}`)
  })

  async function handler(req: IncomingMessage, res: ServerResponse){

    // LIKE WE MENTIONED ONCE
    // ALL ROUTING IS JUST A BUNCH OF IF STATEMENTS

    if(req.method === "GET" && req.url === "/records"){

      try{

        const records = await client.getAllRecords()

        res.writeHead(200,{
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        })
        // WE ARE SENDING JSON

        console.log({records})

        res.end(JSON.stringify({records}))
        return;
      }catch(err){
        console.error(err)
        res.statusCode = 500;
        res.end()
        return;
      }

    }else{

      
      fileServer.serve(req,res)
      return;
    }




    
  }


}


initServer()
