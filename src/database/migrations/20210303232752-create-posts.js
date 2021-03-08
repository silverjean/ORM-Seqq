module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'posts',
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
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          references: {
            model: 'users',
            key: 'uid',
          },
        },
        created_at: { type: Sequelize.DATE, allowNull: false },
        updated_at: { type: Sequelize.DATE, allowNull: false },
      },
      {
        tableName: 'posts',
      }
    );
  },

  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
