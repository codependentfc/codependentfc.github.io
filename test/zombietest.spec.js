
var Browser = require("zombie");
var url = "http://codependentfc.github.io/";
var browser = new Browser();

describe("testing with zombie", function() {

    it("should have defined headless browser", function(next){
        expect(typeof browser != "undefined").toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it("should be able to see home page", function(next) {
        browser.visit(url, function(err) {
            expect(browser.html("body")).toContain("T E A M");
            expect(browser.query("#landing-div")).not.toBeNull();
            next();
        });
    });

    it('should be able to click through to my profile from home page', function(next) {
      browser.visit(url, function(err) {
            expect(browser.link('a','Adam','/adamkowalczyk')).not.toBeNull();
            browser.clickLink("Adam", function() {
              expect(browser.text('h1')).toBe('Adam');
            });
            next();
        });
    });

});


