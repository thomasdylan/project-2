var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load Review By ID
  app.get("/reviews/:id", function(req, res) {
    db.Post.findOne({ where: { id: req.params.id } }).then(function(dbPost) {
      res.render("review", {
        Post: dbPost
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
