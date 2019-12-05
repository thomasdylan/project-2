var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

//Test Get All Reviews

describe("GET /api/reviews", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all reviews", function(done) {
    // Add some examples to the db to test with
    db.Flush.bulkCreate([
      { text: "First Review", description: "First Text Body" },
      { text: "Second Review", description: "Second Text Body" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/reviews").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({ text: "First Review", description: "First Text Body" });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ text: "Second Review", description: "Second Text Body" });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});