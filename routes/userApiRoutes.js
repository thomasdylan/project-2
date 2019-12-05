var db = require("../models");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

process.env.SECRET_KEY = "secret";

module.exports = function(app) {
  //REGISTER
  app.post("/api/register", function(req, res) {
    var userData = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender
    };
    db.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(function(user) {
        if (!user) {
          var hash = bcrypt.hashSync(userData.password, 10);
          userData.password = hash;
          db.Users.create(userData)
            .then(function(user) {
              var token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
              });
              res.json({ token: token });
            })
            .catch(function(err) {
              res.send("error: " + err);
            });
        } else {
          res.json({ err: "User already exists" });
        }
      })
      .catch(function(err) {
        res.send("error: " + err);
      });
  });

  //LOGIN
  app.post("/api/login", function(req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(function(user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          var token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.json({ token: token });
        } else {
          res.send("User does not exist");
        }
      })
      .catch(function(err) {
        res.send("error: " + err);
      });
  });

  //PROFILE
  app.get("/profile", function(req, res) {
    var decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    db.User.findOne({
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

  app.get("/api/user/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.put("/api/user/:id", function(req, res) {
    db.User.update(
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
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
      console.log("Changed Password");
    });
  });
};
