const {createReadStream} = require('fs');


console.log(process.argv)
console.log({IN: process.stdin})
console.log({OUT: process.stdout})
// CREATING READABLE STREAM FROM THIS FILE
const readableStream = createReadStream(process.argv[1])//.pipe(process.stdout)

// console.log({readableStream})
