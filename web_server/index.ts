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

    console.log({client})

    res.statusCode = 200
    res.write("Hello world")
    res.end()
  }


}




initServer()
