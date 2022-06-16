const concat = require("concat-stream");
const through = require("through2")


// LETS CALCULATE LENGHT IN BYTES FOR STANDARD INPUT
process.stdin.pipe(concat((buf) => {
  console.log(`LENGTH OF ENTIRE STANDARD INPUT ${buf.length}`)
}))
// THIS CAN'T BE PIPED ANYMORE SINCE CONCAT WAS THE WRITABLE STREAM


