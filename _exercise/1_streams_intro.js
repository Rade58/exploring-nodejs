const {createReadStream} = require("fs")
// W WILL USE THIS CONSTRUCTOR
const {Transform} = require("stream")

const through = require("through2")

function writeToUppercase(chunkBuffer, bufferEncoding, next ) {  
  
  // INSTEAD OF THIS
  // next(null, chunkBuffer.toString().toUpperCase())
  
  // YOU CAN WRITE THIS
  this.push(chunkBuffer.toString().toUpperCase())
  next()
  
  

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
.pipe(transform)
// .pipe(through(writeToUppercase))
//
.pipe(process.stdout)

