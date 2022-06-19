#!/usr/bin/env node
"use strict"

// WE NEED ALSO A createWriteStream
const {createReadStream, createWriteStream} = require("fs")
const path = require("path")

const {Transform} = require("stream")

const minimist = require("minimist");


const myWriteStream = createWriteStream("_exercise_2/some_file.txt")

// ADDING AN EVENT
myWriteStream.once("finish", () => {
  process.stdout.write("You wrote to file\n")
})


const transToUpperCase = new Transform({

  transform(chunkBuff, chunkEnc, next) {
    
  
    this.push(chunkBuff.toString().toUpperCase())

    next()

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


neuReadStream.pipe(transToUpperCase).pipe(myWriteStream);

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