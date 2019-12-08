var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var should = chai.should();

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
      { title: "Review Title", rating: 4, tmi: "Review Description" },
    ]).then(function() {
      //Request the route that deletes a review
      request.get("/api/reviews/:id").end(function(err, res) {
        let responseStatus = res.status;
        let responseBody = res.body;

        //Run assertions on the response

        should.not.exist(err);

        responseStatus.should.have.status(200);

        responseBody
          .should.be.a("object")
          .should.have.property("REMOVED");

        responseBody.REMOVED
          .should.be.a("object")
          .should.have.property("title")
          .should.have.property("rating")
          .should.have.property("tmi")
          .should.have.property("id")
          .title.should.equal("Review Title")
          .rating.should.equal(4)
          .tmi.should.equal("Review Description");
      });
    });
  });

});