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
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    }
  });
  Post.associate = function(models) {
    Post.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Post;
};
