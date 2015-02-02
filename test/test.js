var assert = require("assert"); // node.js core module
var days = require('../scripts/about.js');
var expect = chai.expect;

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4)); // 4 is not present in this array so indexOf returns -1
    })
  })
});


it('should return a string', function {
  expect(typeof countup(2015,0,26)).to.equal('String')
});

