const {createReadStream} = require("fs")
const through = require("through2")

const writeToUppercase = (chunkBuffer, bufferEncoding, next ) => {
  next(null, chunkBuffer.toString().toUpperCase())
}

// INSTEAD OF CREATING NEW READABLE STREAM
// THT WOULD TAKE CONTENTS OF FILE YOU FEED THE SCRIPT
// createReadStream(process.argv[2])
// I AM GOING TO USE STANDARD INPUT (LIKE I MENTIONED TO YOU,
// HE IS ALSO A READABLE STREAM)
process.stdin
// THE REST STAYS THE SAME (WE ARE TRANSFORMING DATA)
.pipe(through(writeToUppercase))
.pipe(process.stdout)

