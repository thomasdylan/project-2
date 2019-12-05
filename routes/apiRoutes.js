var db = require("../models");

module.exports = function(app) {
  // Get All Reviews
  app.get("/api/reviews", function(req, res) {
    db.Flush.findAll({}).then(function(dbFlush) {
      res.json(dbFlush);
    });
  });

  // Create A New Review
  app.post("/api/reviews", function(req, res) {
    db.Flush.create(req.body).then(function(dbFlush) {
      res.json(dbFlush);
    });
  });

  // Delete A Review By Id
  app.delete("/api/reviews/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Flush.destroy({ where: { id: req.params.id } }).then(function(dbFlush) {
      res.json(dbFlush);
    });
  });
};
