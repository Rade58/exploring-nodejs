#!/usr/bin/env node
"use strict"

const {createReadStream} = require("fs")
const path = require("path")

const {Transform} = require("stream")

const minimist = require("minimist");



const transToUpperCase = new Transform({

  // NOW THIS CAN'T BE AN ARROW FUNC
  transform(chunkBuff, chunkEnc, next) {
    
    
    // OK, NOW LETS NOT USE THIS SYNATAX
    // next(null, chunkBuff.toString().toUpperCase())

    // SINCE WE WANT TO DELAY CALLING OF    next()

    // WE WILL USE push
    this.push(chunkBuff.toString().toUpperCase())

    // AND WE WILL DEFINE DELAYED GOING TO THE NEXT CHUNK
    // SINCE CALLING next WILL TURN YOU TO NEXT CHUNK
    // IF YOU REMEMBE
    setTimeout(() => {

      next()

    }, 3000)


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