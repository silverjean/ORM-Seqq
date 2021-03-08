module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      {
        tableName: 'posts',
      },
      [
        {
          content: 'test',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content: 'test 2',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]
    );
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete(
      {
        tableName: 'posts',
      },
      null,
      {}
    );
  },
};
