var db = require("../models");

module.exports = function(app) {
  // Get All Reviews
  app.get("/api/reviews", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Create A New Review
  app.post("/api/reviews", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Delete A Review By Id
  app.delete("/api/reviews/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Post.destroy({ where: { id: req.params.id } }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
