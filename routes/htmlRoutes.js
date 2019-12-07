var db = require("../models");
var jwt = require("jsonwebtoken");

process.env.SECRET_KEY = "secret";

module.exports = function(app) {
  // Load landing page
  app.get("/", function(req, res) {
    res.render("index");
  });

  //Login page
  app.get("/login", function(req, res) {
    res.render("login");
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

  //PROFILE
  app.get("/profile", function(req, res) {
    var decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    db.Users.findOne({
      where: {
        id: decoded.id
      }
    })
      .then(function(user) {
        if (user) {
          res.json(user);
        } else {
          res.send("User does not exist");
        }
      })
      .catch(function(err) {
        res.send("error: " + err);
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
