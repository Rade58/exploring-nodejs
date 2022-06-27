# CHROME DEV TOOLS REMOTE DEBUGGING

TO BE ABLE TO USE THIS YOUR PROGRAM "NEEDS TO HANG", YOU NEED TO HAVE SERVER, OR YOU NEED TO BE TINKERING WITH STANDARD INPUT SO YOUR PROGRAM IS LIVING

WHEN EXECUTING YOUR NODEJS PROGRAM YOU CAN USE THIS FLAG: **`--inspect`** (**YOU NEED TO PUT THIS AFTER `node` EXECUTABLE, AND BEFORE PATH OF THE FILE; SO IN THE MIDDLE**); AND YOUR DEBUGGERR TOOL IS GOING TO BE GENERATED AND YOUR PROGRAM IS GOING TO BE ABLE TO BE ACCESSIBLE BY BROWSER; ALL OF THIS WITH USAGE OF WEB SOCKET

WHEN YOU DO THIS, YOU CAN OPEN YOUR BROWSER DEVELOPED ON CHROMIUM; FOR EXAMPLE `Google Chrome`, `Microsoft Edge`, `Brave`; AND YOU CAN OPEN THIS (DEPENDING ON THE BROWSER YOU'RE USING): 

`edge://inspect/#devices`
`chrome://inspect/#devices`
`brave://inspect/#devices`

WHEN YOU ARE THERE, IF YOU GO THERE, A LINK WILL BE PROVIDED FOR YOU, AND THAT'S A LINK WHERE YOUR DEBUGGER IS HOSTED 

# LETS TRY THIS ON EXAMPLE, WE ARE GOING TO USE `debugger` TOO

```
touch _exercise/foobarzing.js
```

```js
const express = require("express")

const app = express()

app.get("/", async (req, res) => {

  const ob = {
    hello: "world",
    foo: "bar"
  }
  
  // I'M USING DEBUGGER HERE
  debugger;
  
  // HERE I'M CALLING FUNCTION THAT ISN'T DEFINED
  f00()
  
  const a = 2;
  
  console.log(a)
  
  res.end("hello world")

})

app.listen(3000, () => {
  console.log("hello world server")
})
```

**LETS RUN OUR PROGRAM WITH `--inspect`**

```
node --inspect  _exercise/foobarzing.js
```

**GO TO**

```
brave://inspect/#devices
```

**YOU'LL SE A PATH TO YOUR FILE YOU NT TO DEBUG AND `inspect` BUTTON**

**CLICK ON INSPECT**

THE REST FIGURE OUT BY YOURSELF (YOU WILL MOSTLY USE Sourcs TAB)