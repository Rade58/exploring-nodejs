#!/usr/bin/env node
"use strict"

const minimist = require("minimist");




// *****************************************

function printHelp(){
  console.log(`
          foobar --help

  --help          getting help
  --file          specify file path (string)
  `)
}

function error(msg, includeHelp = false){

  console.error(msg)

  if(includeHelp){
    printHelp()
  }
}