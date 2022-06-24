// @ts-ignore
import {Server} from 'node-static-alias'
import path from 'path'

// THIS PATH IS GOING TO BE THE DOCUMENT ROOTH
const WEB_FILES_PATH = path.resolve(__dirname, "web_files");

console.log({WEB_FILES_PATH})


const initFileServer = async () => {

  
  const fileServer = new Server(WEB_FILES_PATH, {
    cache: 100,
    serverInfo: "Shibatoshi Workshop",
    alias: [
      {
        match: /^\/(?:index\/?)?(?:[?#].*$)?$/,
        serve: "index.html",
        force: true,
      }
    ]
  })
  
  return fileServer;

}