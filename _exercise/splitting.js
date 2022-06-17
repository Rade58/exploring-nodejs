const {createReadStream} = require("fs")
const through2 = require("through2")
const split2 = require("split2")


createReadStream("_exercise/currencies.txt")
  // WE ADDD THIS
  .pipe(split2())
  // 
  .pipe(through2((buffChunk, buffEnc, next) => {

    // AND NOW WE WILL HAVE MANY MORE CHUNKS
    console.log(buffChunk)

    next()
  }))
  .pipe(process.stdout)
