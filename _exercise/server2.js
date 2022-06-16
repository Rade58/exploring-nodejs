const http = require("http")
const querystring = require("querystring")
const concat = require("concat-stream")

const server = http.createServer(async (req, res) => {

  let byteCounter = 0
  
  req.pipe(through((chunkBuff, buffEncoding, next) => {

    
    console.log({byteCounter})
    
    if(byteCounter > 26) {
      res.statusCode = 416
      res.statusMessage = "Range exceeded"
      return res.end()
    }else{
      res.statusCode = 200
      res.end("ok")
    }
    
    // HERE YOU GO
    byteCounter += chunkBuff.length;

  }))

})


server.listen(6666, () => {
  console.log("server started")
})
