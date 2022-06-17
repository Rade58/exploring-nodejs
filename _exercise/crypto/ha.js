// THIS FUNCTION PRODUCES TRANSITION STREAM
const {createHash} = require("crypto");

// WE CAN USE STANDARD IN AND PIPE IT TO THE HASH STREAM, AND PIPE THAT AGAIN TO STANDATRD OUT
// TO PRINT OUT HASH

process.stdin.pipe(createHash("sha512")).pipe(process.stdout);


