var db = require("../models");
var bcrypt = require("bcryptjs");

module.exports = function(app) {
  app.post("/api/register", function(req, res) {
    // The salt and hash variables are used for password encryption.
    var salt = bcrypt.genSaltSync(16);
    var hash = bcrypt.hashSync(req.body.password, salt);
    console.log("Hash: " + hash);
    db.Users.create({
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
      salt: salt,
      gender: req.body.gender
    }).then(function(dbUser) {
      console.log("User Added");
      // May want to route to users page after creation.
      res.json(dbUser);
    });
  });

  app.get("/api/user/:id", function(req, res) {
    db.Users.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.put("/api/user/:id", function(req, res) {
    db.Users.update(
      {
        userName: req.body.userName
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function(dbUser) {
      res.json(dbUser);
      console.log("Updated Username");
    });
  });

  app.put("/api/user/:id/passwordChange", function(req, res) {
    var salt = bcrypt.genSaltSync(16);
    var hash = bcrypt.hashSync(req.body.password, salt);
    db.Users.update(
      {
        password: hash
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function(dbUser) {
      res.json(dbUser);
      console.log("Updated Password");
    });
  });

  app.delete("/api/user/:id", function(req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
      console.log("Changed Password");
    });
  });
};
