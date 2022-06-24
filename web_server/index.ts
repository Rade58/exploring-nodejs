import {createServer} from 'http'
import type {IncomingMessage, ServerResponse} from 'http'
import initDB from './db'
import createFileServer from './file-server'

// WE IMPORT SEEDING FUNCTION
import seed from './seed'


const HTTP_PORT = 8066;

const fileServer = createFileServer()

async function initServer() {
  
  const client = await initDB()

  // WE USE SEEDING HERE
  await seed(client)

  // TO CHECK IF SEEDING REALLY HAPPENED LETS
  // PRINT ALL RECORDS
  // WE WILL REMOVE THIS LATER OFCOURSE
  const table = await client.getAllRecords()
  console.table(table
    )

  const httpServer = createServer(handler)
  
  httpServer.listen(HTTP_PORT, () => {
    console.log(`Server on poort ${HTTP_PORT}`)
  })
  
  async function handler(req: IncomingMessage, res: ServerResponse){

    fileServer.serve(req,res)

    return;

    if(req.url === "/hello"){
      res.writeHead(200, {
        "Content-Type": "text/plain"
      })
      res.write("Hello world")
      res.end()
    }else{

      res.writeHead(404)
      res.end()
    }   

  }


}




initServer()
