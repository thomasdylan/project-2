module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 12]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Users.associate = function(models) {
    Users.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };
  return Users;
};
