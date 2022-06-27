const express = require("express")

const app = express()

app.get("/", async (req, res) => {

  const ob = {
    hello: "world",
    foo: "bar"
  }
  
  // I'M USING DEBUGGER HERE
  debugger;
  
  // HERE I'M CALLING FUNCTION THAT ISN'T DEFINED
  f00()
  
  const a = 2;
  
  console.log(a)
  
  res.end("hello world")

})

app.listen(3000, () => {
  console.log("hello world server")
})