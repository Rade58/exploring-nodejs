const {createReadStream} = require("fs")
const through = require("through2")

console.log(process.argv)


createReadStream(process.argv[2])
// WE ARE GOING TO TRANSFORM TO UPPERCASE ALL THE DATA OF READABLE STREAM
.pipe()

.pipe(process.stdout)
