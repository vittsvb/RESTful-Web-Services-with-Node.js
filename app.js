var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;

var db;

if (process.env.ENV == 'Test') {
	db = mongoose.connect('mongodb://localhost:27017/bookapi_test');
} else {
	var db = mongoose.connect('mongodb://localhost:27017/bookapi');
}

var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json());

//db.books.remove( {"_id": ObjectId("5a4c18aacdc0d71c6c129b88")});

bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);

app.get('/', function (req, res) {
	res.send("BOOKS API");
});

app.listen(port, function () {
	console.log("localhost:" + port);
});

module.exports = app;