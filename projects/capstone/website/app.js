/* Global Variables */
//const apiKey = '13c2d4a41a2205d07ea0069f0320e129&units=imperial';
// const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}';
// const baseURL = 'http://api.geonames.org/postalCodeLookupJSON?postalcode=';

const baseURL = 'http://localhost:3000/'
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const city =  document.getElementById('zip').value;
    const country =  document.getElementById('feelings').value;

    const departureDate = document.getElementById('departingDate').value

    function convertHTMLDateToJSDate(htmlDate) {
      // Assuming htmlDate is in the format 'YYYY-MM-DD'
      const [year, month, day] = htmlDate.split('-').map(Number);
    
      // JavaScript months are 0-indexed, so subtract 1 from the month
      return new Date(year, month - 1, day);
    }

    const departingDateJS = convertHTMLDateToJSDate(departureDate)

    function getDifferenceInDays(futureDate) {
      const today = new Date();
      console.log(today,futureDate);
      const timeDifference = futureDate.getTime() - today.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    
      return daysDifference;
    }

    const daysFromToday = getDifferenceInDays(departingDateJS);

    getCoordinate(city,country)
    // .then(function(data){
    //     console.log(data);
    //     // console.log(newContent);
    //     // console.log(newDate);
    //     postData('/addEntry', {lng: data.lng, lat: data.lat});
    // })
    .then(function(data) {
      return getWeather(data.lat,data.lng, daysFromToday)
    }).then((weatherData) =>  {
      console.log(weatherData);
      updateUI(daysFromToday, weatherData)
    }
  ).then(
      getPicture(city+', '+country)

    )


}

const getCoordinate = async (city,country)=>{

    //const res = await fetch(baseURL+zip+key)
    const res = await fetch(baseURL+`getCoordinate?city=${city}&country=${country}`);
    try {
  
      const data = await res.json();
      localStorage.setItem('lat', JSON.stringify(data.lat));
      localStorage.setItem('lng', JSON.stringify(data.lng));
      console.log(data.lat,data.lng);
      console.log(data);
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }


  const getWeather = async (lat,lng, days)=>{

    //const res = await fetch(baseURL+zip+key)
    const res = await fetch(baseURL+`getWeather?lat=${lat}&lng=${lng}&days=${days}`);
    try {
  
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }


  const getPicture = async (place)=>{

    //const res = await fetch(baseURL+zip+key)
    const res = await fetch(baseURL+`getPicture?place=${place}`);
    try {
  
      const data = await res.json();
      document.getElementById('picture').innerHTML='<img src="' +data["hits"][0]["largeImageURL"]+'"/>';
      // return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }


const updateUI = async (day, weather) =>{
    // const request = await fetch('/all');
    try {
      console.log(weather);
      const dataID = day % 7;
      console.log(dataID);

      if (day > 7) {
        let high_temp = weather['data'][dataID]['max_temp']
        let low_temp = weather['data'][dataID]['low_temp']
        let weather_description = weather['data'][dataID]['weather']['description']
        var weather_str = 'High: ' + high_temp + ' Low: ' + low_temp + ' Weather: ' + weather_description;
      } else {

        let temp = weather['data'][0]['temp']
        let weather_description = weather['data'][0]['weather']['description']
        var weather_str = 'Temperature: ' + temp + ' Weather: ' + weather_description;
      }
    // Transform into JSON
    // const allData = await request.json()
    // console.log(allData)
    // // Write updated data to DOM elements
    // document.getElementById('temp').innerHTML = Math.round(allData[0].temp)+ 'degrees';
    // document.getElementById('content').innerHTML = allData[0].content;
    // document.getElementById('date').innerHTML =allData[0].date;
    // document.getElementById('picture').innerHTML=url
      document.getElementById('temp').innerHTML = 'Your trip is ' + day + ' days from today'
      // document.getElementById('date').innerHTML = 'High: ' + high_temp + ' Low: ' + low_temp + ' Weather: ' + weather_description;
      document.getElementById('date').innerHTML = weather_str;
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
