const {createReadStream} = require("fs")

console.log(process.argv)


createReadStream(process.argv[2]).pipe(process.stdout)
