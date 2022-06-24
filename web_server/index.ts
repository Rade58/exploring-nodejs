import {createServer} from 'http'
import type {IncomingMessage, ServerResponse} from 'http'
import initDB from './db'
import createFileServer from './file-server'

const HTTP_PORT = 8066;

const fileServer = createFileServer()

async function initServer() {
  
  const client = await initDB()

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
