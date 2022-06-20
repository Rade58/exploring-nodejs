#!/usr/bin/env node
"use strict"

const {createReadStream, createWriteStream} = require("fs")
const path = require("path")
const {Transform} = require("stream")

// WE NEED createGunzip
const {createGzip, createGunzip} = require("zlib")
// 

const minimist = require("minimist");

const args = minimist(process.argv.slice(2), {
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


const myWriteStream = createWriteStream(
  "_exercise_2/some_file.txt" + ( args["compress"] ? ".gzip":"")
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



let ourNewStream;

const toUpperCaseStream = neuReadStream
.pipe(transToUpperCase)


// LETS ADD IF STATEMENT OVER HERE
if(filePath.endsWith("gzip")){

  // AND WE DO THIS
  ourNewStream = neuReadStream.pipe(createGunzip())
    
}else{

  // WE DON'T NEED TO CHANGE ANYTHING IN HERE 
  
  
  
  if(args["compress"]){
    
    ourNewStream = toUpperCaseStream.pipe(createGzip())
    
  }else{
    ourNewStream = toUpperCaseStream
  }
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