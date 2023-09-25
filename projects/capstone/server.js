// Setup empty JS object to act as endpoint for all routes
const projectData = [];
//const projectData = [{animal:"elephant", score: 10},{animal:"kangaroo",score:3}]
// Require Express to run server and routes
const express = require('express');
const { listenerCount } = require('process');
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
// Setup Server
app.get('/', (req, res) => {
    res.send('HELLO FROM YELP CAMP')
})
app.listen(3000, () => {
    console.log(`serving on port: ${port}`)
})

app.get('/all', function (req, res) {
    res.send(projectData)
  })

app.post('/addEntry', addProjectData);

function addProjectData (req, res) {

    newEntry = {
        temp: req.body.temp,
        content: req.body.content,
        date: req.body.date
    }
    projectData.push(newEntry);
    console.log(projectData)
    res.send(projectData)
    
};