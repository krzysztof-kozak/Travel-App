let projectData = {};

var path = require('path');
const express = require('express');
// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser and cors  
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
const cors = require('cors')
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server  - 

const port = 3000;
const server = app.listen(port, listening);
function listening() {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};


// API INFO
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your username is ${process.env.geonamesUserName}`);
console.log(`Your API key from weatherBit is ${process.env.weatherbitApiKey}`);
console.log(`Your API key from pixabay ${process.env.pixabayApiKey}`);

const geonamesUsername = process.env.geonamesUsername;
const weatherbitApiKey = process.env.weatherbitApiKey;
const pixabayApiKey = process.env.pixabayApiKey;

//send api key to client side
app.get('/api_data', sendApiKey);

function sendApiKey(req, res) {
    res.send({
        geonamesUsername: geonamesUsername,
        weatherbitApiKey: weatherbitApiKey,
        pixabayApiKey: pixabayApiKey,
    })
    res.send(console.log('hello I`m your APi Keys '))
}

// Post route 

app.post('/add', postData);
function postData(req, res) {
    projectData = req.body;
    res.send({
        message: 'post recived'
    });
    console.log('dane z Frontu', projectData)
}

//GET route
app.get('/all', sendData);
function sendData(req, res) {
    res.send(projectData)
    res.send(console.log('hello'))
}



module.exports = {
    app
}