const concat = require("concat-stream");

// LETS CALCULATE LENGHT IN BYTES FOR STANDARD INPUT

process.stdin.pipe(concat((buf) => {
  console.log(buf.length)
}))
// THIS CAN'T BE PIPED ANYMORE SINCE CONCAT WAS THE WRITABLE STREAM


