const {createReadStream} = require("fs")
// W WILL USE THIS CONSTRUCTOR
const {Transform} = require("stream")

const through = require("through2")


const writeToUppercase = (chunkBuffer, bufferEncoding, next ) => {
  
  next(null, chunkBuffer.toString().toUpperCase())
}

// WE WILL BUILD A Transform INSTANCE
const transform = new Transform({
  // FUNCTION ABOVE WILL BE ASSIGNA AS transform OPTION
  transform: writeToUppercase
})
// WHICH WE CAN USE AS pipe ARGUMENT

process.stdin
// INSTEAD OF THIS
// .pipe(through(writeToUppercase))
// WE WILL USE THIS
.pipe(transform)
// 
.pipe(process.stdout)

