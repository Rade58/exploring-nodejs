#!/usr/bin/env node

"use strict"

// WE USE THIS PACKAGE
const minimist = require("minimist")

// AND WE PASS THE ARGV
const argv = minimist(process.argv)

console.log(argv)




// *************************
function getHelp(){
  console.log(`
    foo.js --help

  --help          try getting help
  `)
}