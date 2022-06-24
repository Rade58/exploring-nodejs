// @ts-ignore
import {Server} from 'node-static-alias'
import path from 'path'

// THIS PATH IS GOING TO BE THE DOCUMENT ROOTH
// FOR US IT IS       web_server/web_files
// BUT WE NEED ABSOLUTE PATH SO WE ARE USING THIS
const WEB_FILES_PATH = path.resolve(__dirname, "web_files");
// BASICALY WE ARE GOING TO MAKE web_server/web_files
// AND PUT OUR HTML FILES THERE

// console.log({WEB_FILES_PATH})

// THIS PACKAGE BASICALY USES node-static UNDER THE HOOD
// BUT IT HAS SUPPORT FOR ALIASES

// BASICALLY WE WILL HAVE A REGEX MATCHING
// IF USER REQUESTS    /         index.html IS GOING TO BE SERVED
// OFCOURSE WE NEED TO DEFINE THOSE REGEX
// BUT I AM NOT PLANING TO WRITE THEM BY MYSELF
// I'M GOING COPY THEM

// YOU WILL REMEMBER THIS KIND OF SYNTAX
// YOU WERE DOING THIS WHEN SETTING WEB SERVER LIKE NGINX
// OR WHEN WE WERE DEALING WITH KUBERNETES

const createFileServer = () => {

  const fileServer = new Server(WEB_FILES_PATH, {
    cache: 100,
    serverInfo: "Shibatoshi Workshop",
    alias: [
      // THIS IS FOR MAIN PAGE 
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

export default createFileServer;