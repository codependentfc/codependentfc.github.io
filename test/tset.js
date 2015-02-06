var assert = require("assert");
var request = require("supertest");

request = request("http://codependentfc.github.io/week2/frame/");


// Example of a Basic test using Mocha and Supertest.
describe("When a user goes to Guardian project page", function() {
	it("should return status code 200 OK", function(done) {
		request.get("/")
		.expect(200, done);
	});

	it("should contain the text 'sport'", function(done) {
		request.get("/")
		.expect(/sport/, done);
	});

	it("should contain a link with id 1, inner HTML of 'sport'", function(done) {
		request.get("/")
		.expect(/href='#sport' aria-controls='sport' role='tab' data-toggle='tab' class="sport">Sport<\/a>/, done);
	});

 it('should contain banner', function(done) {
        request.get('/')
            .expect(/media\/theguardian.png/, done);
    });

});

