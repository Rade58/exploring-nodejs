#!/usr/bin/env node
"use strict"

const fs = require('fs');
const path = require("path")


const minimist = require("minimist");

const argv = minimist(process.argv, {
  boolean: ["help"],
  string: ["file"],  
})

console.log(argv["file"])

console.log(argv)

if(argv["help"]){
  printHelp()
}else if(argv["file"]){
  // WE READ THE FILE

  const absPath = path.resolve(argv["file"])

  const fileContent = fs.readFileSync(absPath)
  
  // console.log(fileContent)
  console.log(absPath)

  process.stdout.write(fileContent)

}else{
  error("Wrong stuff", true)
}





// *************************
function printHelp(){
  console.log(`
    foo.js --help

  --help          try getting help
  `)
}

function error(msg, includeHelp = false){

  console.error(msg)

  if(includeHelp){
    printHelp()
  }
}