const {request} = require("http");

// MAYBE HERE WE CAN USE STANDARD IN LIKE A
// WAY TO PRIVIDE DATA FOR THE REQUEST


const req = request({
  host: "localhost",
  port: 3006,
  url: "/",
  method: "POST",


}, (res) => {

})

process.stdin.once("end", () => {
  
  req.end()

})

process.stdin.pipe(req)



