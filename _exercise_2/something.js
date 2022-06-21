const {
  createReadStream,
  createWriteStream} = require("fs");

// LETS CREATE READ STREAM

console.log("random things")

const readStream = createReadStream("_exercise_2/blog-post.mdx");

console.log("random things 2")

readStream.on("end", () => {
  console.log("reding ended")
})





