#!/usr/bin/env node
"use strict"

const minimist = require("minimist")

// WE JUST SPECIFY THAT IN OPTIONS
const argv = minimist(process.argv, {
  boolean: ["help"],
  string: ["file"]
})

console.log(argv)




// *************************
function getHelp(){
  console.log(`
    foo.js --help

  --help          try getting help
  `)
}