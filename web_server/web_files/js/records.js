(function(){
  
  // THIS IS OUR FUNCTION 
  async function fetchAllRecords (){
    
    try{

      const resp = await fetch("/records");

      const data = await resp.json()

      renderRecords(data)

    }catch(err){

      console.error(err.message)
        
    }
  }


  function renderRecords(data){
    // 
    // 
  }



})()