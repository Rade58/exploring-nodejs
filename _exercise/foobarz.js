const {createReadStream, createWriteStream} = require("fs")
const {createGunzip, createGzip} = require("zlib")
const {createHash} = require("crypto")

const readable = createReadStream("_exercise/my_server.js")
  .pipe(createGzip())
  .pipe(createWriteStream("_exercise/zlib/my_server.js.gzip"))



readable.once("finish", () => {
  createReadStream('_exercise/zlib/my_server.js.gzip')
    .pipe(createGunzip())
    // HASHING CHUNK
    .pipe(createHash("sha256", {encoding: "hex"}))
    // PIPING CHUNK TO STANDARD OUTPUT
    .pipe(process.stdout)
})