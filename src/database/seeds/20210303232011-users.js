module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      {
        tableName: 'users',
      },
      [
        {
          name: 'Fulano',
          email: 'fulano@email.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Beltrano',
          email: 'beltrabo@email.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]
    );
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete(
      {
        tableName: 'users',
      },
      null,
      {}
    );
  },
};
