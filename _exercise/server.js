const http = require("http")

const server = http.createServer(async (req, res) => {

  console.log(req.rawHeaders);

  res.statusCode = 201;
  res.end("Hello World")

})


server.listen(4666, () => {
  console.log("server started")
})
