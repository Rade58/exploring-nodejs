const {createReadStream} = require("fs")
const through = require("through2")

console.log(process.argv)

// THIS IS GOING TO BE TRANSFORM FUNCTION
// WE WANT TO DEFINE FUNCTION WIH WILL DO UPPERCASE ON
// A CHARACTER

// FUNCTION WILL BE A PARAMETER OF THE through
// FUNCTION, WHUCH WILL CREATE A TRAANSFORM STREAM FOR THE CHUNKS
const writeToUppercase = (chunkBuffer, bufferEncoding, next ) => {
 
    // FIRST ARGUMENT IS ERROR (WE PASSED null FOR THAT)
    // SECOND ARGUMENT IS CHUNK OF DATA FOR WHICH WE DEFINE
    // TRANSFORMATION TO UPPERCASE
    next(null, chunkBuffer.toString().toUpperCase())
}


createReadStream(process.argv[2])
// WE ARE GOING TO TRANSFORM TO UPPERCASE ALL THE DATA OF READABLE STREAM
// .pipe()

// .pipe(process.stdout)
