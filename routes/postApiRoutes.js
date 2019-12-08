var db = require("../models");
var authControl = require("./authRoutes.js");

module.exports = function(app) {
  //POST
  app.get("/post", isLoggedIn, authControl.post);

  app.post("/post", function(req, res) {
    var postData = {
      title: req.body.title,
      rating: req.body.rating,
      tmi: req.body.tmi,
      user: req.user.userName,
      gender: req.user.gender,
      foreignKey: req.user.email
    };
    // eslint-disable-next-line no-unused-vars
    db.Post.create(postData).then(function(dbPost) {
      res.render("post");
    });
  });

  //Get All Post
  // eslint-disable-next-line no-unused-vars
  app.get("/api/post", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });

  //Delete A Review By Id
  app.delete("/api/post/:id", function(req, res) {
    db.Post.destroy({ where: { id: req.params.id } }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  //Logged in Auth
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
};
