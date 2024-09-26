// Setup empty JS object to act as endpoint for all routes
//const projectData = [];
//const projectData = [{animal:"elephant", score: 10},{animal:"kangaroo",score:3}]
// Require Express to run server and routes
const express = require('express');
const { listenerCount } = require('process');

const https = require('https');
// Start up an instance of app
const app = express()
/* Middleware*/
const axios = require('axios');
const path = require('path');
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

const port = 8081;
// Setup Server
app.get('/', (req, res) => {
    // res.send('HELLO FROM YELP CAMP')
    res.sendFile('dist/index.html')
})
app.listen(port, () => {
    console.log(`serving on port: ${port}`)
})

app.get('/all', function (req, res) {
    res.send(projectData)
  })
  app.get('/test', (req, res) => {
    res.send('HELLO FROM YELP CAMP')
})
app.post('/addEntry', addProjectData);

function addProjectData (req, res) {
    const projectData = [];

    newEntry = {
        lat: req.body.lat,
        lng: req.body.lng,
        
    }
    projectData.push(newEntry);
    console.log(projectData)
    res.send(projectData)
    
};



app.get('/getCoordinate', (req,res) => {
    const url = `http://api.geonames.org/searchJSON?maxRows=10&operator=OR&name=${req.query.city}&country=${req.query.country}&username=zcttony`;
    axios.get(url).then(resp => {
        res.end(JSON.stringify(resp.data.geonames[0]));
    })
    .catch(err => {
        res.end(JSON.stringify({err : "There is some error"}));

    })

})

app.get('/getWeather', (req,res) => {
    console.log(req.query)
    if (req.query.days > 7) {

        var url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.lng}&key=9248ab371e6447ef96f76996e5639bf8`


    } else {

        var url = `https://api.weatherbit.io/v2.0/current?lat=${req.query.lat}&lon=${req.query.lng}&key=9248ab371e6447ef96f76996e5639bf8`


    }
    // const url = `https://api.weatherbit.io/v2.0/current?lat=${req.query.lat}&lon=${req.query.lng}&key=9248ab371e6447ef96f76996e5639bf8`
    // const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.lng}&days=${req.query.days}&key=9248ab371e6447ef96f76996e5639bf8`
    axios.get(url,{ httpsAgent: agent }).then(resp => {
        res.end(JSON.stringify(resp.data));
    })
    .catch(err => {
        res.end(JSON.stringify({err : err}));
    })
})

// app.get('/getWeather', (req,res) => {
//     console.log(req.query)
//     const url = `https://api.weatherbit.io/v2.0/current?lat=${req.query.lat}&lon=${req.query.lng}&key=9248ab371e6447ef96f76996e5639bf8`
//     axios.get(url,{ httpsAgent: agent }).then(resp => {
//         res.end(JSON.stringify(resp.data));
//     })
//     .catch(err => {
//         res.end(JSON.stringify({err : err}));
//     })
// })


app.get('/getPicture', (req,res) => {

    const API_KEY = '44452014-8b1d632d2382739dafe20f771';
    //var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
    const url = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(req.query.place)

    axios.get(url,{ httpsAgent: agent }).then(resp => {
        res.end(JSON.stringify(resp.data));
    })
    .catch(err => {
        res.end(JSON.stringify({err : err}));
    })
})
//https://api.weatherbit.io/v2.0/current?lat=48.85341&lon=2.3488&key=9248ab371e6447ef96f76996e5639bf8