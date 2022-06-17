const {createServer} = require("http");
const {createReadStream, createWriteStream} = require("fs")

// LETS CREATE WRITABLE TREAM
// AND WRITE DATA FROM THE  REQUEST INTO SOME FILE

const server = createServer(async (req, res) => {
  // 
  if(req.method === "POST"){
    // 
    const writable = createWriteStream("_exercise/data.json")

    req.pipe(writable);

    // WHEN WRITING ENDS, WE SHOULD END
    req.once("end", () => {
      res.statusCode = 200;
      res.end("ok")

    })

  }else {

    res.statusCode = 400;
    res.statusMessage("Wrong method")
    res.end()

  }


})

server.listen(3006,() => console.log("listening on port 3006"))

