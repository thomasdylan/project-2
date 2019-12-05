var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load Review By ID
  app.get("/reviews/:id", function(req, res) {
    db.Flush.findOne({ where: { id: req.params.id } }).then(function(dbFlush) {
      res.render("review", {
        flush: dbFlush
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
