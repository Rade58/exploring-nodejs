// A READ STREAM THAT TAKES PROVIDED DATA FROM ENVIRONMENT
process.stdin
// 
// PIPING CHUNKS TO THE STANDARD OUT WHICH IS THE WRITE STREAM
.pipe(process.stdout)
