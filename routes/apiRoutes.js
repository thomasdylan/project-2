var db = require("../models");

module.exports = function(app) {
  // Get All Reviews
  app.get("/api/reviews", function(req, res) {
    db.Users.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create A New Review
  app.post("/api/reviews", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Delete A Review By Id
  app.delete("/api/reviews/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Users.destroy({ where: { id: req.params.id } }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
};
