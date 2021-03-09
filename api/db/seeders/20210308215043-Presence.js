module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Presences',
    [
      {
        meeting: 'NFC',
        userId: 1,
        roomId: 2,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        meeting: 'NFC',
        userId: 2,
        roomId: 2,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Presences', null, {}),
};