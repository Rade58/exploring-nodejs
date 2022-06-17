const {createWriteStream} = require('fs');

// WE WILL CREATE WRITABLE STREAM FROM CONTENTS OF THE FILE
// "_exercise/someFile.txt"


const w1 = createWriteStream("_exercise/someFile1.txt")
const w2 = createWriteStream("_exercise/someFile2.txt")

// THIS DOESN'T WORK
// I TRIED, BUT EVENT DOESN'T TRIGGER AT ALL
w1.once("finish", (a) => {
  console.log("Hello World")
})
// w1.on ALSO DOESN'T WORK

 
// KNOW THAT PREVIOUS DATA WILL BE ERASED 
w1.write("Hello World \n")
w1.write("Hello World \n")
w1.write("Hello World \n")
w1.write("Hello World \n")
w1.write("Hello World \n")
w1.write("Hello World \n")
w1.write("Hello World \n")

w2.write("Hello Bioconstructor\n")