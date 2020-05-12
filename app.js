var express = require('express');
var app     = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// [Configure mongoose]
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    // Connected to MongoDB SERVER
    console.log("Connected to mongod server.");
});

mongoose.connect('mongodb://tester:tester@127.0.0.1:27017/testDB?authSource=testDB&readPreference=primary&appname=MongoDB%20Compass&ssl=false');

// DEFINE MODEL
var Book = require('./models/book');

// [Configure App to Use Body-Parser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [Configure App Web Server PORT]
var port = process.env.PORT || 8080;

// [Configure App  Router]
var router = require('./routes')(app, Book);

// [Run Server]
var server = app.listen(port, (req,res) => {
    console.log("Express server has started on port " + port);
});