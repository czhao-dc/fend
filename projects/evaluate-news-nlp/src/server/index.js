const dotenv = require('dotenv');
dotenv.config();

const projectData = [];

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))
console.log(`Your API key is ${process.env.API_KEY}`);
console.log(__dirname)

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//const cors = require('cors');
//app.use(cors());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/all', function (req, res) {
    console.log('sent from all',projectData
    )
    res.send(projectData)
  })



// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/addEntry', addProjectData);

function addProjectData (req, res) {


    let polarity = ''
    if (req.body.polarity == 'P+' | req.body.polarity == 'P') {polarity = 'positive'}
    else if (req.body.polarity == 'NEU') {polarity = 'neutral'}
    else if (req.body.polarity == 'N+' | req.body.polarity == 'N') {polarity = 'negative'}
    else {polarity = 'without polarity'} 

    newEntry = {
        polarity: polarity,
        subjectivity: req.body.subjectivity,
        text: req.body.text,

    }
    projectData.push(newEntry);
    console.log('this is', projectData[projectData.length-1])
    res.send(projectData)
    
    
};

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


app.get('/test1', function (req, res) {
    res.send('kkkk')
})
