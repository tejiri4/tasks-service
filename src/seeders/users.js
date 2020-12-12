module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        id: 1,
        name: 'Test user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
