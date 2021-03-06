// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8080;

const server = app.listen(port, () => {
  console.log(`running on : http://localhost:${port}`);
});

// Get All Data * Get Route * 
app.get("/all", getData);

function getData(req, res) {
  res.send(projectData);
  console.log(projectData);
}

// Post All Data * Post Route *
app.post("/addData", addAnimal);

function addAnimal(req, res) {
  console.log(req.body);
  newEntry = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
  };

  projectData = newEntry;
  res.send(projectData);
  console.log(projectData);
}
