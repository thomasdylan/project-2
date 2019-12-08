var db = require("../models");

// eslint-disable-next-line prettier/prettier
var exports = module.exports = {};

exports.signup = function(req, res) {
  res.render("signup");
};

exports.signin = function(req, res) {
  res.render("login");
};

exports.profile = function(req, res) {
  res.render("profile", {
    userName: req.user.userName,
    gender: req.user.gender
  });
};

exports.post = function(req, res) {
  db.Post.findAll({}).then(function(dbPost) {
    console.log(dbPost);
    res.render("post", {
      post: dbPost,
      userName: req.user.userName,
      gender: req.user.gender,
      email: req.user.email
    });
  });
};

exports.logout = function(req, res) {
  // eslint-disable-next-line no-unused-vars
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
