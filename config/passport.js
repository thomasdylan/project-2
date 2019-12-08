var bCrypt = require("bcryptjs");
var db = require("../models");

// eslint-disable-next-line no-unused-vars
module.exports = function(passport, user) {
  var LocalStrategy = require("passport-local").Strategy;

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        var generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        };

        db.Users.findOne({
          where: {
            email: email
          }
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "An account already exist for this email"
            });
          } else {
            var userPassword = generateHash(password);
            var userData = {
              userName: req.body.userName,
              email: email,
              password: userPassword,
              gender: req.body.gender
            };
            // eslint-disable-next-line no-unused-vars
            db.Users.create(userData).then(function(newUser, created) {
              if (!newUser) {
                return done(null, false);
              }
              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  //LOCAL SIGNIN
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        var isValidPassword = function(userPassword, password) {
          return bCrypt.compareSync(password, userPassword);
        };
        db.Users.findOne({
          where: {
            email: email
          }
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: "Email does not exist"
              });
            }
            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect password."
              });
            }
            var userInfo = user.get();
            return done(null, userInfo);
          })
          .catch(function(err) {
            console.log("Error: ", err);
            return done(null, false, {
              message: "Something went wrong with your login."
            });
          });
      }
    )
  );

  //serialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  //deserialize
  passport.deserializeUser(function(id, done) {
    db.Users.findOne({ where: { id: id } }).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};
