const {createWriteStream} = require('fs');

// WE WILL CREATE WRITABLE STREAM FROM CONTENTS OF THE FILE
// "_exercise/someFile.txt"

const w = createWriteStream("_exercise/someFile.txt")

w.on("finish", (a) => {
  console.log({a})
})

 
// KNOW THAT PREVIOUS DATA WILL BE ERASED 
w.write("Hello World \n")
w.write("Hello World \n")
w.write("Hello World \n")
w.write("Hello World \n")
w.write("Hello World \n")
w.write("Hello World \n")
w.write("Hello World \n")



