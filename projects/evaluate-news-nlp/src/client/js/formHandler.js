function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    if (Client.checkForName(formText)===true) {

    console.log("::: Form Submitted :::")
    // fetch('http://localhost:8081/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })
    // getData(formText)
    // .then(function(data){
        // postData('/addEntry', {polarity:data.score_tag,subjectivity: data.subjectivity, text: formText});
    postData('/addEntry', {text:formText});
    // })

    return "success"
    } else {
      return "input error"
    }
    // .then(

    //     updateUI()
    // )
}


const postData = async ( url = '', data = {})=>{
    
    const response = await fetch("http://localhost:8081"+url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
            console.log(newData)
            document.getElementById('results').innerHTML = 'polarity: '+newData[newData.length-1].polarity+', subjectivity: '+newData[newData.length-1].subjectivity+', text: '+newData[newData.length-1].text;
             return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}

export { handleSubmit }
