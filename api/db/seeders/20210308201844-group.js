'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'groups',
      ['M2 MBDS', 'M2 INTENSE', 'M2 IA', 'M2 SIRIS'].map((g, i) => ({
        id: i + 1,
        name: g,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('groups', null, {}),
}
