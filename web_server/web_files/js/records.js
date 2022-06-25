(function(){
  


  renderRecords()

  
  async function fetchAllRecords (){
    
    try{

      const resp = await fetch("/records");

      const data = await resp.json()

      return data;

    }catch(err){

      console.error(err.message)
      
      return {records: []}
    }
  }

  // THIS IS HELPER WE ARE USING
  // AS YOU CAN SEE I AM USING PACKAGE FROM CDN CALLED
  // json2html
  function renderData(records, el) {
    var transforms = {
            "row": {
                    "<>": "tr",
                    html: "<td>${something}</td><td>${other}</td>",
            },
            "table": {
                    "<>": "table",
                    border: "1",
                    cellPadding: "10",
                    html: function table(){
                            return `<tr><td>Something</td><td>Other</td></tr>
                                    ${json2html.transform(records,transforms.row)}
                            `;
                    },
            },
    };

    el.innerHTML = json2html.transform({},transforms.table);
  }


  function renderRecords(){
  
    // WE CAN NOW DEFINE RENDERING
    const button = document.querySelector("button[rel*=js-button]");
    const container = document.querySelector("div[rel*=js-records]");
    
    const handleClick = () => {

      fetchAllRecords().then(({records}) => {
        // USING HELPER TO RENDER DATA
        renderData(records, container)
      })

    }

    button.addEventListener("click", handleClick, false)
    
  }



})()