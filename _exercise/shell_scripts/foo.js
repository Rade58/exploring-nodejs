#!/usr/bin/env node
"use strict"

const minimist = require("minimist");

const argv = minimist(process.argv, {
  boolean: ["help"],
  string: ["file"],
  // I ADDED THIS
  default: {
    file: "/_exercise/bazbaz.js",
    help: true
  }
})

console.log(argv)

// *************************
function getHelp(){
  console.log(`
    foo.js --help

  --help          try getting help
  `)
}