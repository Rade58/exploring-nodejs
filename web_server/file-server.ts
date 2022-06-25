// @ts-ignore
import {Server} from 'node-static-alias'
import path from 'path'

const WEB_FILES_PATH = path.resolve(__dirname, "web_files");


const createFileServer = () => {

  const fileServer = new Server(WEB_FILES_PATH, {
    cache: 100,
    serverInfo: "Shibatoshi Workshop",
    alias: [
 
      {
        match: /^\/(?:index\/?)?(?:[?#].*$)?$/,
        serve: "index.html",
        force: true,
      },
      {
        match: /^\/js\/.+$/,
        serve: "<% absPath %>",
        force: true,
      },
      {
        match: /^\/(?:[\w\d]+)(?:[\/?#].*$)?$/,
        serve: function onMatch(params: any) {
                return `${params.basename}.html`;
        },
      },
      {
        match: /[^]/,
        serve: "404.html",
      }

    ]
  })
  
  return fileServer;

}

// WE WERE USING THIS FUNCTION IN HANDLER
// WE WERE PASSING IT req AND res

export default createFileServer;