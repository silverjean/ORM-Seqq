import Sequelize, { Model } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        content: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        users_uid: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          references: {
            model: 'users',
            key: 'uid',
          },
        },
      },
      {
        sequelize,
        tableName: 'posts',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'users_uid',
    });
  }
}

export default Post;
