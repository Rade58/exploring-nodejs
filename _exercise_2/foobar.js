#!/usr/bin/env node
"use strict"

const {createReadStream, createWriteStream} = require("fs")
const path = require("path")
const {Transform} = require("stream")

// IT IS AN ANOTHER USEFUL NATIVE PACKAGE
const {createGzip} = require("zlib")
// 

const minimist = require("minimist");



const args = minimist(process.argv.slice(2), {
  // ADDING ANOTHER BOOLEAN
  // WE WANT TO BE ABLE TO USE --compress FLAG
  // WHEN RUNNING THE SCRIPT
  boolean: ["help", "compress"],
  string: ["file"]
})


if(args["help"]){
  return printHelp()
}

if(!args["file"]){
  return printError("You must provide file path", true)
}


const filePath = path.resolve(args["file"])


// SO IF A USER DID WANT TO COMPRESS WE WANT TO USE ANOTHER
// WRITE STREAM WITH .gzip EXTENSION
// THAT IS WHY WE ARE USING TERNARY
const myWriteStream = createWriteStream(
  "_exercise_2/some_file.txt" + args["compress"] ? ".gzip":""
)

myWriteStream.once("finish", () => {
  process.stdout.write("You wrote to file\n")
})


const transToUpperCase = new Transform({

  transform(chunkBuff, chunkEnc, next) {
    
  
    this.push(chunkBuff.toString().toUpperCase())

    next()

  }
})

const neuReadStream = createReadStream(filePath)

neuReadStream.on("error", (err) => {

  printError(err.message)
})

// WE NEED TO PIPE TO COMPRESSION STREAM
// CONDITIONALLY
// SO INSTEAD OF THIS WHICH WE HAD EARLIER
// neuReadStream
  // .pipe(transToUpperCase)
  // .pipe(myWriteStream);

// WE DECLARE VARIABLE 
const toUpperCaseStream = neuReadStream
  .pipe(transToUpperCase)

// AND THE REST OF PIPING IS CONDITIONAL

let ourNewStream;

if(args["compress"]){

  ourNewStream = toUpperCaseStream.pipe(createGzip())

}else{
  ourNewStream = toUpperCaseStream
}

// WE THEN CAN PIPE TO FILE
ourNewStream.pipe(myWriteStream)


// *****************************************

function printHelp(){
  console.log(`
          foobar --help

  --help          getting help
  --file          specify file path (string)
  `)
}

function printError(msg, includeHelp = false){

  console.error(msg)

  if(includeHelp){
    printHelp()
  }
}