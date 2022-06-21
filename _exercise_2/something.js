const {
  createReadStream,
  createWriteStream} = require("fs");


// WE DEFINE THIS FUNCTION
const pipeAsync = async (readable, writable) => {

  return new Promise((res, rej) => {
    
    // RESOLVE WHEN WRITING TO STREAM ENDED

    writable.once("finish", () => {
      res({readable, writable})
    })

    writable.on("error", (err) => {
      rej(err)
    })    

    // WE CAN START PIPING HERE
    readable.pipe(writable)
    console.log("piping started")

  })

}

// LETS TEST IT

const readStream = createReadStream("_exercise_2/blog-post.mdx");
const writeStream = createWriteStream("_exercise_2/another-blog-post.mdx")

async function main() {

  // THIS SHOULD PRINT "BEFORE PIPING" START
  console.log("before piping")

  try{

    const streams = await pipeAsync(readStream, writeStream)
    return streams

  }catch(err){

    console.error(err)
    
  }

  // THIS SHOULD BE PRINTED AFTER PIPING HAPPENS
  console.log("after piping")

}


main()