var assert = require("assert");
var request = require("supertest");

request = request("./week2maj.js");

describe('testing method within scripts', function(){
  describe('getJSON', function(){
    it('should have a getJSON Method', function(){
      assert.equal(typeof getJSON, 'function');
    });
  });
});


it("should have a status property of 'ok' and a total > 0", function(done){
    APIroot.get(newsSectionApiTest)
        .expect(function(res){
          assert.equal(res.body.response.status, 'ok');
        })
        .expect(function(res){
          assert.equal(res.body.response.total > 0, true);
        })
        .end(done);
