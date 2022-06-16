const http = require("http")
const querystring = require("querystring")
const concat = require("concat-stream")

const server = http.createServer(async (req, res) => {

  if(req.method !== "POST") {
    res.statusCode = 404
    return res.end();
  }
  
  
  req.pipe(concat(
    // WITH THIS ARGUMENT
    {encoding: "string"}
    ,
    // THIS IS NO LONGER BUFFER
    (buff) => {
    
      // IT IS A STRING E CAN PARSE LIKE THIS
    const data = querystring.parse(buff)

    console.log({buff})

    console.log(typeof data === "object")
    console.log({data})


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


server.listen(6661, () => {
  console.log("server started")
})
