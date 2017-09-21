// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
// Requiring our Note and Article models
// var Note = require("./models/Note.js");
// var Article = require("./models/Article.js");
// Our scraping tools
// var request = require("request");
// var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
// mongoose.Promise = Promise;

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Import routes and give the server access to them.
var router = express.Router()
require("./controllers/scraper_controller.js")(router)

// Serve static content
app.use(express.static(__dirname + "/public"));

// Set Handlebars.

app.engine("handlebars", expressHandlebars({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(router)

var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"
// mongoose.connect("mongodb://heroku_6qwnq0tj:smpei6n9m46kgldfuen9lhau0r@ds141514.mlab.com:41514/heroku_6qwnq0tj");

mongoose.connect(db, function(err){
	if(error){
		console.log(error)
	} else {
		console.log("mongoose connection is successful")
	}
})

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});