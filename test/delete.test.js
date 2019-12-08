var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

//Setting up the chai http plugin
chai.use(chaiHttp);

var request;

//Test Delete Review

describe("DELETE /api/reviews/:id", function() {
  //Before each test begins, create a new request server for testing
  //& delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should delete a review", function(done) {
    //Add an example to be deleted
    db.Post.bulkCreate([
      { id: 1, title: "Review Title", rating: "4", tmi: "Review Description" },
    ]).then(function() {
      //Request the route that deletes a review
      request.delete("/api/reviews/1").end(function(err, res) {
        let responseStatus = res.status;
        let responseBody = res.body;

        //Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody).to.not.include({ id: 1, title: "Review Title", rating: "4", tmi: "Review Description" });

        done();
      });
    });
  });

});