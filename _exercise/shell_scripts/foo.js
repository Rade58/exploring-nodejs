#!/usr/bin/env node
"use strict"

const fs = require('fs');
const path = require("path")


const minimist = require("minimist");






const argv = minimist(process.argv, {
  boolean: ["help"],
  string: ["file","in"],  
})



// THING IS THAT THIS PCKAGE CAN'T BE USED WITH require
// IT 

// YOU NEED DYNAMIC IMPORT
import("get-stdin")
  .then((package) => {
    // IT'S A DEFAU;T IMPORT
    package.default().then(value => {
      
      // THIS IS A STRING
      // A VALUE PARSED FROM STANDARD INPUT STREAM
      // console.log({value})

      // W CAN NOW PUT ALL LOGIC IN HERE

      if(argv["help"]){
        printHelp()

      // WE WILL DEFINE THAT STANDARD INPUT HAS
      // 


      }else if(value.length !== 0){

        return process.stdout.write(value)

      }else if(argv["file"] && value.length === 0){
      
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




    })
  } ).catch((err) => {
    console.log({err})
  })






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