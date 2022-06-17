const {createReadStream, createWriteStream} = require("fs")
const {createHash} = require("crypto")
const {createGunzip, createGzip} = require("zlib")


// CREATING WRITABLE STREAM FOR COMPRESSED FILE
const writable = createWriteStream("_exercise/some_compressed_file.gzip")

// THAT COMPRESSED FILE IS GOING TO BE BUILD FROM STANDARD INPUT
process.stdin
  .pipe(createGzip({})).pipe(writable)
  

// WHEN WE FINISH WITH WRITING
writable.once("finish", () => {

  // WE CAN CREATE READABLE STREAM FROM COMPRESSED FILE
  createReadStream("_exercise/some_compressed.gzip")
  // WE UNCOMPRESS
  .pipe(createGunzip())
  // WE HASH
  .pipe(createHash("sha256", {encoding: "hex"}))
  // AND PRINT OUT HASH AS STANDARD OUTPUT
  .pipe(process.stdout)

})
  
