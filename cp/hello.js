const http = require("http")
const querystring = require("querystring")
const concat = require("concat-stream")
const through = require("through2")

const server = http.createServer(async (req, res) => {

  let byteCounter = 0
  
  req.pipe(through(function (chunkBuff, buffEncoding, next){

    
    byteCounter += chunkBuff.length;
    console.log({byteCounter})
    
    if(byteCounter > 26) {
      res.statusCode = 416
      res.statusMessage = "Range exceeded"

      return res.end()
    }else{
      next(null, null)
    }
    

  })).pipe(concat((b) => {
    console.log({b})
  
  res.statusCode = 200
  return  res.end("ok")
  
  }))



})


server.listen(6661, () => {
  console.log("server started")
})