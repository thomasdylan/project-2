module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tmi: {
      type: DataTypes.TEXT,
      validate: {
        max: 256
      }
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING
    }
  });
  Post.associate = function(models) {
    Post.belongsTo(models.Users, {
      foreignKey: "userEmail"
    });
  };
  return Post;
};
