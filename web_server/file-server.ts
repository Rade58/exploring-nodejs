// @ts-ignore
import {Server} from 'node-static-alias'
import path from 'path'

const WEB_FILES_PATH = path.resolve(__dirname, "web_files");



export const fileServer = new Server(WEB_FILES_PATH, {
  cache: 100,
  serverInfo: "Shibatoshi Workshop",
  alias: []
})
