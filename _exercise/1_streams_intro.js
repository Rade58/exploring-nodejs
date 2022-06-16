const {createReadStream} = require("fs")
const through = require("through2")

const writeToUppercase = (chunkBuffer, bufferEncoding, next ) => {
  next(null, chunkBuffer.toString().toUpperCase())
}


createReadStream(process.argv[2])
.pipe(through(writeToUppercase))
.pipe(process.stdout)

