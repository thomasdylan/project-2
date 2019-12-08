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
  db.Post.findAll({
    where: {
      user: req.user.userName
    }
  }).then(function(dbPost) {
    res.render("profile", {
      post: dbPost,
      title: JSON.stringify(dbPost.title),
      rating: JSON.stringify(dbPost.rating),
      tmi: JSON.stringify(dbPost.tmi),
      user: JSON.stringify(dbPost.user),
      gender: JSON.stringify(dbPost.gender),
      userName: req.user.userName,
      gender: req.user.gender,
      email: req.user.email
    });
  });
};

exports.post = function(req, res) {
  db.Post.findAll({}).then(function(dbPost) {
    res.render("post", {
      post: dbPost,
      title: JSON.stringify(dbPost.title),
      rating: JSON.stringify(dbPost.rating),
      tmi: JSON.stringify(dbPost.tmi),
      user: JSON.stringify(dbPost.user),
      gender: JSON.stringify(dbPost.gender),
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
