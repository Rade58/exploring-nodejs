(function(){
  
  // THIS IS OUR FUNCTION 
  async function fetchAllRecords (){
    
    try{

      const resp = await fetch("/records");

      renderRecords()

    }catch(err){

      console.error(err.message)
        
    }
  }


  function renderRecords(){
    // 
    // 
  }



})()