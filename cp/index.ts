#!/usr/bin/env ts-node
"use strict"

import childProc from 'child_process'

// SPAWNING MULTIPLE CHILD PROCESSES EXAMPLE

main()


function main(){

  let continueSpawning = true;


  while(continueSpawning){

    // USE PROMISES TO DEFER

    console.log({continueSpawning})

    Promise.resolve().then(() => {

      const child = childProc.spawn(
        "node",
        ["cp/child.js"]
      )
      
      child.on("exit", (code) => {

        console.log({code})
        if(code === 1){
          continueSpawning = false
        }
      })

    })

  }

}








// OLD EXAMPLE
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