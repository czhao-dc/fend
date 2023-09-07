const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');
const projectData = [];

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))
console.log(`Your API key is ${process.env.API_KEY}`);
console.log(process.env.API_KEY)
console.log(__dirname)

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//https://stackoverflow.com/questions/36494336/npm-install-error-unable-to-get-local-issuer-certificate
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

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

app.post('/addEntry', async  (req, res) => {

    var FormData = require('form-data');
    const formdata = new FormData();

    formdata.append("key", process.env.API_KEY);
    formdata.append("url", req.body.text);
    formdata.append("lang", "en");
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

    const data = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions);

    try {


    
        const results = await data.json();
        console.log(results);
        let polarity = ''
        if (results.score_tag == 'P+' | results.score_tag == 'P') {polarity = 'positive'}
        else if (results.score_tag == 'NEU') {polarity = 'neutral'}
        else if (results.score_tag == 'N+' | results.score_tag == 'N') {polarity = 'negative'}
        else {polarity = 'without polarity'} 

        newEntry = {
            polarity: polarity,
            subjectivity: results.subjectivity,
            // text: req.body.text,
            text:results.sentence_list[results.sentence_list.length-1].text

        }
        projectData.push(newEntry);
        
        console.log('this is', projectData[projectData.length-1])
        res.send(projectData)
} catch (error) {
    console.log("error", error);
}
    
    
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


app.get('/test1', function (req, res) {
    res.send('kkkk')
})
