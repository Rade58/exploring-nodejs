const http = require("http")
const concat = require("concat-stream")

const server = http.createServer(async (req, res) => {

  if(req.method !== "POST") {
    res.statusCode = 404
    return res.end();
  }
  
  // YOU NEED TO KNOW THIS ONE THING
  // req    IS ALSO A READABLE STREAM
  
  
  // SO WE CAN USE pipe


  req.pipe(concat((buff) => {

    // IT IS OBVIOUS WHAT WE DID HERE
    
    if(buff.length > 26) {
      res.statusCode = 416
      res.statusMessage = "Range exceeded"
      return res.end()
    }else{
      res.statusCode = 200
      res.end("ok")
    }

  }))



})


server.listen(4666, () => {
  console.log("server started")
})
