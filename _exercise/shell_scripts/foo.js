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
  

    // LETS READ FILE ASYNCHRONOUSLY
    // WE CAN'T USE PROMISES BECAUSE THIS IS
    // OLD PACKAGE, BUT WE CAN WRAP PROMISE
    // BUT I AM NOT DOING THIS NOW
    // SO LETS JUST USE CALLBACKS
    fs.readFile(absPath, (err, buff) => {

      if(err){
        return process.stderr.write(err.message + "\n");    
      }

      if(buff.toString("utf8").length === 0){
        return process.stdout.write("Empty file\n")
      }
      
      // YOU CAN PASS BUFFER HERE
      process.stdout.write(buff)
      

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