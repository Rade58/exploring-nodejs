#!/usr/bin/env node

"use strict"

// process.stdout.write("Shibonk")

// getHelp()

// DOING THIS
const argv = process.argv.slice(2)

console.log(argv)


// *************************
function getHelp(){
  console.log(`
    foo.js --help

  --help          try getting help
  `)
}