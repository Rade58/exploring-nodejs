const {createServer} = require("http");
const {createReadStream, createWriteStream} = require("fs")

// LETS CREATE WRITABLE
// AND PIPE DATA FROM THE  REQUEST INTO SOME FILE

// LETS ALSO PIPE SOME DATA INTO RESPONSE

const server = createServer(async (req, res) => {
  // 
  if(req.method === "POST"){
    // 
    const writable = createWriteStream("_exercise/data.json")

    req.pipe(writable);
    

    // WHEN WRITING ENDS, WE SHOULD END
    req.once("end", () => {
      
      writable.end()
      
      // RESPONSE IS ALSO WRITABLE
      // LETS WRITE SOME THINGS TO IT

      // AS YOU REMEMBER, WE CAN USE  .write
      // AND WE EXECUTE .end TO CLOSE THE STREAM

      // OR YOU DON'T NEED TO USE write AND PASS WHAT YOU WANT
      // TO THE .end

      // BUT LETS CREATE A NEW READABLE FROM THE FILE
      // WE JUST WRITTED TO
      const readable = createReadStream("_exercise/data.json")


      // WHEN READING ENDS

      readable.once("end", () => {

        res.statusCode = 201;
        
        
        res.end()
      })
      
      res.setHeader("Content-type", "application/json")
      
      readable.pipe(res)
      

    })

  }else {

    res.statusCode = 400;
    res.statusMessage("Wrong method")
    res.end()

  }

})

server.listen(3006,() => console.log("listening on port 3006"))

