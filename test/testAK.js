var assert = require("assert");
var supertest = require("supertest");

// Example of a Basic test using just Mocha.
// describe("The number one", function() {

//   it("should equal 1", function() {
//       assert.equal(1, 1);
//   });

//   it("should not equal 2", function() {
//       assert.notEqual(1, 2);
//   });
// });

// Home Page:
var homeRequest = supertest("http://codependentfc.github.io/");

describe("When a user goes to the home page", function() {

  it("should return status code 200 OK", function(done) {
      homeRequest.get("/")
          .expect(200, done);
  });
  // Check (any) page content has been sent
  it("should contain the text 'T E A M'", function(done) {
      homeRequest.get("/")
          .expect(/T E A M/, done);
  });
  // Check if navbar has loaded
  it("should contain the text '&lt; Home &gt;'", function(done) {
      homeRequest.get("/")
          .expect(/&lt; Home &gt;/, done);
  });
});


// News Feed: week2/responsive/
var newsRequest = supertest("http://codependentfc.github.io/week2/responsive/");

describe("When a user goes to the news feed page", function() {

  it("should return status code 200 OK", function(done) {
      newsRequest.get("/")
          .expect(200, done);
  });

  // Check (any) page content has been sent
  it("should contain the text 'Responsive News Feed'", function(done) {
      newsRequest.get("/")
          .expect(/Responsive News Feed/, done);
  });

  // Check if navbar has loaded
  it("should contain the text '&lt; Home &gt;'", function(done) {
      newsRequest.get("/")
          .expect(/&lt; Home &gt;/, done);
  });
});

// Test Guardian API requests
var APIroot = supertest('http://content.guardianapis.com');
var newsSectionApiTest = "/sections?api-key=yht9jzt3ccngxwgyknvfaj89";

describe('When a section API call is made', function() {

  it("should return status code 200 OK", function(done) {
      APIroot.get(newsSectionApiTest)
          .expect(200, done);
  });

  it("should have a status property of 'ok' and a total > 0", function(done) {
      APIroot.get(newsSectionApiTest)
          .expect(function(res){
            assert.equal(res.body.response.status, 'ok');
          })
          .expect(function(res){
            assert.equal(res.body.response.total > 0, true);
          })
          .end(done);
  });
});

var newsTopicApiTest = '/search?section=uk-news&page=1&order-by=newest&show-fields=body%2CtrailText&page-size=5&api-key=yht9jzt3ccngxwgyknvfaj89';

describe('When a UK News API call is made', function() {

  it("should return status code 200 OK", function(done) {
      APIroot.get(newsTopicApiTest)
          .expect(200, done);
  });

  it("should have a status property of 'ok' and a total > 0", function(done) {
      APIroot.get(newsTopicApiTest )
          .expect(function(res){
            assert.equal(res.body.response.status, 'ok');
          })
          .expect(function(res){
            assert.equal(res.body.response.total > 0, true);
          })
          .end(done);
  });


});
