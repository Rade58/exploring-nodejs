import {createReadStream, createWriteStream} from 'fs'

const readable = createReadStream("_exercise/server2.js");

const writeable = createWriteStream("cp/hello.js")

readable.pipe(writeable);