const {createWriteStream} = require('fs');

// WE WILL CREATE WRITABLE STREAM FROM CONTENTS OF THE FILE
// "_exercise/server2.js"

const w = createWriteStream("_exercise/server2.js")

w.on("finish", (a) => {
  console.log({a})
})


w.write("Hello World \n")
w.write("Hello World \n")
w.write("Hello World \n")
w.write("Hello World \n")
w.write("Hello World \n")
w.write("Hello World \n")
w.write("Hello World \n")
w.write("Hello World \n")



