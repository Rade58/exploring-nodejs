#!/usr/bin/env node

"use strict"

process.stdout.write("Shibonk")

getHelp()


// *************************
function getHelp(){
  console.log(`
    foo.js --help

  --help          try getting help
  `)
}