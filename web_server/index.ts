import {createServer} from 'http'
import type {IncomingMessage, ServerResponse} from 'http'

import initDB from './db'

// WE WILL IMPORT THIS
import createFileServer from './file-server'


const HTTP_PORT = 8066;

// WE CAN CREATE FILE SERVER
const fileServer = createFileServer()


async function initServer() {
  
  const client = await initDB()
  
  const httpServer = createServer(handler)
  
  httpServer.listen(HTTP_PORT, () => {
    console.log(`Server on poort ${HTTP_PORT}`)
  })
  
  async function handler(req: IncomingMessage, res: ServerResponse){

    // WE CA PASS REQUEST AND RESPONSE TO FILE SERVER
    fileServer.serve(req,res)

    // LETS RETURN HERE FOR NOW
    return;

    if(req.url === "/hello"){
      res.writeHead(200, {
        "Content-Type": "text/plain"
      })
      res.write("Hello world")
      res.end()
    }else{
      // IF NOT SEND 404
      res.writeHead(404)
      res.end()
    }
   

  }


}




initServer()
