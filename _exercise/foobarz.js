const {createReadStream, createWriteStream} = require("fs")
const {createGunzip, createGzip} = require("zlib")

// LETS CREATE READABLE STREAM FROM A FILE
const readable = createReadStream("_exercise/my_server.js")
// LETS DO SOME COMPRESSION
.pipe(createGzip())
// LETS WRITE THAT TO A NEW FILE
.pipe(createWriteStream("_exercise/zlib/my_server.js.gzip"))


// WHEN WRITING IS DONE LETS THROW CONTENT
// OF COMPRESSED FILE TO STANDARD OUTPUT

readable.once("finish", () => {
  createReadStream('_exercise/zlib/my_server.js.gzip')
    .pipe(createGunzip())
    .pipe(process.stdout)
})