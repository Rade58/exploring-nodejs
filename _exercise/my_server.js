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
      
      writable.end()
      console.log("PIPING ENDED")
      
      res.statusCode = 200;

      // RESPONSE IS ALSO WRITABLE
      // LETS WRITE SOME THINGS TO IT

      // AS YOU REMEMBER, WE CAN USE  .write
      // AND WE EXECUTE .end TO CLOSE THE STREAM

      // OR YOU DON'T NEED TO USE write AND PASS WHAT YOU WANT
      // TO THE .end

      // BUT LETS USE BOTH
      res.write("you are cool")

      res.end()

    })

  }else {

    res.statusCode = 400;
    res.statusMessage("Wrong method")
    res.end()

  }


})

server.listen(3006,() => console.log("listening on port 3006"))

