#!/usr/bin/env ts-node
"use strict"

import childProc from 'child_process'
import {promisify} from 'util'


main()


function main(){
  

  const child = childProc.spawn(
    "ts-node", 
    ["cp/child1.ts"]
  )

  child.on("exit", (code, signal) => {
    console.log({code, signal})
  } )

}
