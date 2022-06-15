const {createReadStream} = require("fs")

console.log(process.argv)


createReadStream(process.argv[1]).pipe(process.stdout)
