var should = require('should');
var request = require('supertest');
var app = require('../app.js');
var mongoose = require('mongoose');
var Book = mongoose.model('Book')
var agent = request.agent(app);

describe('Book CRUD Test', function () {
	it('Should allow a book to be posted and return a read and _id', function (done) {
		var bookPost = {
			title: 'new book',
			author: 'Vitor',
			genre: 'Action'
		};

		agent.post('/api/books/')
			.send(bookPost)
			.expect(201)
			.end(function (err, results) {
				if (err) {
					console.log('error ', err);
				} else {
					results.body.read.should.equal(false);
					results.body.should.have.property('_id');
					done();
				}
			})
	})

	afterEach(function (done) {
		Book.remove().exec();
		done()
	})
});