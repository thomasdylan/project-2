var db = require("../models");

module.exports = function(app) {
  // Load landing page
  app.get("/", function(req, res) {
    res.render("landing");
  });

  // Load post page
  app.get("/post", function(req, res) {
    res.render("post");
  });

  // Load example page and pass in an example by id
  app.get("/profile/:id", function(req, res) {
    db.Users.findOne({ where: { id: req.params.id } }).then(function(dbResult) {
      res.render("profile", {
        userName: dbResult.userName,
        email: dbResult.email,
        gender: dbResult.gender
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

