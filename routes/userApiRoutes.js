//var db = require("../models");
var authControl = require("./authRoutes.js");

process.env.SECRET_KEY = "yougotflushed";

module.exports = function(app, passport) {
  //REGISTER
  app.get("/signup", authControl.signup);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/signup"
    })
  );

  //LOGIN
  app.get("/login", authControl.signin);

  app.post(
    "/login",
    passport.authenticate("local-signin", {
      successRedirect: "/post",
      failureRedirect: "/login"
    })
  );

  //PROFILE
  app.get("/profile", isLoggedIn, authControl.profile);

  app.get("/logout", authControl.logout);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }

  //EVERYTHING BELOW IS JUNK ATM
  // app.put("/api/user/:id", function(req, res) {
  //   db.Users.update(
  //     {
  //       userName: req.body.userName
  //     },
  //     {
  //       where: {
  //         id: req.params.id
  //       }
  //     }
  //   ).then(function(dbUser) {
  //     res.json(dbUser);
  //     console.log("Updated Username");
  //   });
  // });

  // app.put("/api/user/:id/passwordChange", function(req, res) {
  //   var hash = bcrypt.hashSync(req.body.password, 10);
  //   db.Users.update(
  //     {
  //       password: hash
  //     },
  //     {
  //       where: {
  //         id: req.params.id
  //       }
  //     }
  //   ).then(function(dbUser) {
  //     res.json(dbUser);
  //     console.log("Updated Password");
  //   });
  // });

  // app.delete("/api/user/:id", function(req, res) {
  //   db.Users.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbUser) {
  //     res.json(dbUser);
  //     console.log("Changed Password");
  //   });
  // });
};
