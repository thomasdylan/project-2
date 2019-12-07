var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("example");
  });

  // Load Review Page and pass in a Review
  app.get("/reviews/:id", function(req, res) {
    db.Post.findOne({ where: { id: req.params.id } }).then(function(dbPost) {
      res.render("post", {
        post: dbPost
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};


//app.get("/", function(req, res) {
  //res.sendFile(path.join(__dirname, "../public/view.html"));
//});