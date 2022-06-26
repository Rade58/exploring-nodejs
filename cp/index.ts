#!/usr/bin/env ts-node
"use strict"

import childProc from 'child_process'












// OLD CODE
/* 
main()
function main(){
 
  const child = childProc.spawn(
    // HERE YOU GO
    "node", 
    ["cp/child2.js"]
  )
  
  child.on("exit", (code, signal) => {
    console.log({code, signal})
  })
  
}

 */