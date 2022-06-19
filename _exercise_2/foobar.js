#!/usr/bin/env node
"use strict"

const {createReadStream} = require("fs")
const path = require("path")

// WE ARE USING THIS PACKAGE
const {Transform} = require("stream")

const minimist = require("minimist");


// LETS CREATE TRNSFORMATION
const transToUpperCase = new Transform({

  // REMEBER THAT IF YOU DEFINE THIS AS AN ARROW FUNC
  // YOU CAN'T USE      this
  transform: (chunkBuff, chunkEnc, next) => {
    
    

    // I LIKE DOING THINGS LIKE THIS
    next(null, chunkBuff.toString().toUpperCase())

    // SOME PEOPLE ARE USING        this.push
    // LIKE THIS

    //      this.push(chunkBuff.toString().toUpperCase())
    //      next()


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