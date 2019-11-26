var db = require("../models");
var shPassword = require("../public/js/encrypt.js");

module.exports = function(app) {
  app.post("/api/register", function(req, res) {
    console.log(req.body.userName + "  " + req.body.email);
    var safePassword = shPassword(req.body.password);
    console.log(safePassword);
    db.Users.create({
      userName: req.body.userName,
      email: req.body.email,
      password: JSON.stringify(safePassword.passwordHash),
      salt: JSON.stringify(safePassword.salt)
    }).then(function(dbUser) {
      console.log("User Added");
      res.json(dbUser);
    });
  });
};
