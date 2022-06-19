#!/usr/bin/env node
"use strict"

const {createReadStream} = require("fs")
const path = require("path")

// WE AR USING THIS PACKAGE
const {Transform} = require("stream")

const minimist = require("minimist");

// WE CAN MAKE NEW TRANSFORMASSION
// MAKING ALL CHUNKS TO BE UPPERCASE

// THERE IS A COUPLE OF WAYS WE CAN DO THIS
const toUpperCase = new Transform({
  transform(chunkBuff, chunkEnc, next) {
    
    console.log({chunkBuff})

    next(null, chunkBuff.toString().toUpperCase())

  }
})


const args = minimist(process.argv.slice(2), {
  boolean: ["help"],
  string: ["file"]
})


if(args["help"]){
  return printHelp()
}

if(!args["file"]){
  return printError("You must provide file path", true)
}


  // WE CAN HERE TRY READING FROM A FILE

const filePath = path.resolve(args["file"])


const neuReadStream = createReadStream(filePath)


// WE CAN HANDLE EROR HERE
neuReadStream.on("error", (err) => {

  printError(err.message)
})


// WE CAN PIPE TO THE STANDARD OUT
neuReadStream.pipe(process.stdout);


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