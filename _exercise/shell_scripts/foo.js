#!/usr/bin/env node
"use strict"

const fs = require('fs');
const path = require("path")

const minimist = require("minimist");

const argv = minimist(process.argv, {
  boolean: ["help"],
  string: ["file"],  
})

if(argv["help"]){
  printHelp()
}else if(argv["file"]){

  const absPath = path.resolve(argv["file"])
  
    fs.readFile(absPath, (err, buff) => {

      if(err){
        return process.stderr.write(err.message + "\n");    
      }

      if(buff.toString("utf8").length === 0){
        return process.stdout.write("Empty file\n")
      }
      
      // LETS DO SOME PROCESSING
      const upperContent = buff.toString("utf8").toUpperCase()

      // LETS ADD THIS TO STANDARD OUT

      process.stdout.write(upperContent)
      

    })
      

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