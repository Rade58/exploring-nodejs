import {createServer} from 'http'
import type {IncomingMessage, ServerResponse} from 'http'

import initDB from './db'

const HTTP_PORT = 8066;



async function initServer() {
  
  const client = await initDB()
  
  const httpServer = createServer(handler)
  
  httpServer.listen(HTTP_PORT, () => {
    console.log(`Server on poort ${HTTP_PORT}`)
  })
  
  async function handler(req: IncomingMessage, res: ServerResponse){

    // WE ARE USING req.url
    // SERVE DATA IF PATH IS "/hello"

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
