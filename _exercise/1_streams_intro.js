const {createReadStream, ReadStream, WriteStream} = require('fs');

// before we start here are some facts
// process.argv HOLDS ARRAY WITH SOME DATA
// HERE IS HOW IT LOOKS

/*      

  [
    "path to where node is installed on your system",
    "path of the file who is runned against "node" executable"
    // EVERY NEXT ARGUMENT IS ANYTHING THAT IS PASSED WHEN YOU RUNNED
    // node      IF YOU RUNNED      node file.js foo bar
    // NEXT ARRAY ITEMs WOULD BE   "foo", "bar"


  ]

*/
console.log(process.argv)

// WE HAVE STANDARD OUTPUT AND STANDARD INPUT

// THIS IS READABLE STREAM (ALI OVO JE CIRCULAR REFERENCE)
// THIS LISTNES FOR THE USERS INPUT; EVERYTHING THAT IS PASSED IN
// WITH EXECUTABLE
// console.log(process.stdin)

// WE CAN LISTEN USER DATA IN HERE
// BECAUSE YOU USE THIS YOU WILL BE PROMPTED TO WRITE SOMETHING
// IN TERMINAL
// WHEN YOU WRITE AND PRESS ENTER, PROCESS WILL EXIT
process.stdin.on("data", (data) => {
  // 

  console.log({data: data.toString("utf8")})
  process.exit()
  // 
})

// THIS IS WRITABLE STREAM (ALI OVO JE CIRCULAR REFERENCE)
// console.log(process.stdout)
// 
