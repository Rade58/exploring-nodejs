const {createReadStream} = require("fs")
// W WILL USE THIS CONSTRUCTOR
const {Transform} = require("stream")

const through = require("through2")

const writeToUppercase = (chunkBuffer, bufferEncoding, next ) => {  
  
  this.push(chunkBuffer.toString().toUpperCase())
  next()
  
  // next(null, chunkBuffer.toString().toUpperCase())
}

const transform = new Transform({
  transform: writeToUppercase,
  // this is flush
  flush: (cllback) => {
    // 
    console.log("flushing")
  },
})

createReadStream(process.argv[2])
//
// .pipe(transform)
.pipe(through(writeToUppercase))
//
.pipe(process.stdout)

