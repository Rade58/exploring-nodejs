#!/usr/bin/env node
"use strict"

const fs = require('fs');
const path = require("path")


const minimist = require("minimist");

const argv = minimist(process.argv, {
  boolean: ["help"],
  string: ["file"],  
})

// console.log(argv["file"])
// console.log(argv)

if(argv["help"]){
  printHelp()
}else if(argv["file"]){
  // WE READ THE FILE

  // DON'T USE DIRNAME IF YOU DON'T THINK THAT FILE IS I NSAME FOLDER AS 
  // THIS FILE WHERE WE WRITE SCRIPT
  // const absPath = path.resolve(__dirname ,argv["file"])
  const absPath = path.resolve(argv["file"])
  try{
    const fileContent = fs.readFileSync(absPath)
    
    if(fileContent.toString("utf8").length === 0){
      return process.stdout.write("Empty file\n")
    }
  
    console.log({fileContent: fileContent.toString("utf8")})

    return;
    
  }catch(err){

    return console.error(err.message);

  }


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