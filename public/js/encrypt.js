module.exports = function(userPassword) {
  var crypto = require("crypto");

  var genSalt = function(length) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length);
  };

  var hasher = function(password, salt) {
    var hash = crypto.createHmac("sha512", salt);
    hash.update(password);
    var val = hash.digest("hex");
    return {
      salt: salt,
      passwordHash: val
    };
  };

  function saltHashPassword(userPassword) {
    var salt = genSalt(16);
    var dbPassword = hasher(userPassword, salt);
    return dbPassword;
  }
  return saltHashPassword(userPassword);
};
