import express from 'express'
import initClient from './db'
import seed from './seed'

const PORT = 8066;

const app = express();

// app    IS PRETTY MUCH ALSO  FUNCTION
// SO YOU CAN TECHNICALLY USE IT AS ARGUMENT
// IN HERE:     http.createServer(app)
// BUT WE ARE NOT GOING TO DO THAT BY OURSELFS

// SINCE WE WILL HAVE MORE ROUTES 
// (AND THIS IS NOT IN ANY WAY CONVENTION OF WRITING THINGS LIKE THIS)
// WE WILL ENCAPSULATE LOGIC INSIDE ONE FUNCTION
// ALSO WE NEED TO "MAKE OUR DATBASE CLIENT BEFOREHAND"
async function makeRoutes(){

  const client = await initClient()

  // LETS DO SOME SEEDING SO WE HAVE SOME DATA
  await seed(client)
  // FORGET ABOUT STATIC FILES FOR NOW
  
  // LETS MAKE OUR API ROUTE FIRST
  app.get("/records",async (req,res) => {

    try {

      const records = await client.getAllRecords()

      return res.status(200).json({records})

    }catch(err){

      console.error(err);
      return res.status(500).send("Something went wrong!")

    }


  })

  // WE NEED TO SET UP PORT AND STUFF
  app.listen(PORT, () => {
    console.log(`server listening on port: `)
  })


}


// WE CAN CALL THE FUNCTION
makeRoutes()