#!/usr/bin/env node
"use strict"

const {createReadStream} = require("fs")
const path = require("path")

const {Transform} = require("stream")

const minimist = require("minimist");

// LETS USE COUNTER
let num = 0;

const transToUpperCase = new Transform({

  // THIS WAY THIS CAN BE AN ARROW FUNCTION
  transform: (chunkBuff, chunkEnc, next) => {
    
    // OK, LETS PRINT OUT THE CHUNK
    console.log({chunkBuff})
    // INCREMENTING
    num++;
    // INSTEAD OF PASSING TRANSFORMED DATA
    // next(null, chunkBuff.toString().toUpperCase())
    // LETS PASS INCREMENT, BUT YOU NEED TO TURN IT TO STRING
    next(null, num + "\n")

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


const filePath = path.resolve(args["file"])


const neuReadStream = createReadStream(filePath)

neuReadStream.on("error", (err) => {

  printError(err.message)
})

neuReadStream.pipe(transToUpperCase).pipe(process.stdout);

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