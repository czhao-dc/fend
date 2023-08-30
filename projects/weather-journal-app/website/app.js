/* Global Variables */
const apiKey = '13c2d4a41a2205d07ea0069f0320e129&units=imperial';
// const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const newZip =  document.getElementById('zip').value;
const newContent =  document.getElementById('feelings').value;

getWeather(baseURL,newZip, apiKey)
.then(function(data){
    console.log(data.main.temp);
    console.log(newContent);
    console.log(newDate);
    postData('/addEntry', {temp: data.main.temp, content: newContent, date: newDate});
})
.then(
    updateUI()
)

}

const getWeather = async (baseURL, zip, key)=>{

    //const res = await fetch(baseURL+zip+key)
    const res = await fetch(baseURL+zip+',us&appid='+key);
    try {
  
      const data = await res.json();
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }



const updateUI = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData[0].temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData[0].content;
    document.getElementById('date').innerHTML =allData[0].date;
    }
    catch(error) {
      console.log('error', error);
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
             return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}
