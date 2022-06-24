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
  
  // THIS IS GOING TO BE OUR HANDLER
  // async function handler()
  async function handler(req: IncomingMessage, res: ServerResponse){

    // LETS JUST WRITE SOMETHING TO TST IT
    // AND DON'T FORGET THAT WE ARE DEALING WITH STREAMS

    console.log({client})

    res.statusCode = 200
    res.write("Hello world")
    res.end()
  }




}


