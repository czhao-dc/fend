function handleSubmit(event) {
    event.preventDefault()
    console.log('cakked')
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    // fetch('http://localhost:8081/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })
    getData(formText)
    .then(function(data){
        // postData('/addEntry', {polarity:data.score_tag,subjectivity: data.subjectivity, text: formText});
        postData('/addEntry', {polarity:data.score_tag,subjectivity: data.subjectivity, text: formText});
    })

    return "success"
    // .then(

    //     updateUI()
    // )
}



const getData = async (text)=>{
    var FormData = require('form-data');
    const formdata = new FormData();

    formdata.append("key", "fa2a1d580f8b1e0d5a64ef9ea77d9aef");
    formdata.append("txt", text);
    formdata.append("lang", "en");
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
    

    const res = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions);
    try {
  
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }


const postData = async ( url = '', data = {})=>{
    
    const response = await fetch(url, {
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
