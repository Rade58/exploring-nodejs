#!/usr/bin/env ts-node
"use strict"

import childProc from 'child_process'
import {promisify} from 'util'


main()


function main(){
  
  // LETS SPAWN OUR FIRST EVER CHILD PROCESS
  const child = childProc.spawn("ts-node", ["cp/child1.ts"])

  child.on("exit", (code, signal) => {
    // THIS IS GOING TO BE PRINTED WHEN 
    // CHILD PROCESS FINISHES ITS OWN RUN
    console.log({code, signal})
  } )

}
