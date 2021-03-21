module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'rooms',
      [
        {
          id: 1,
          uuid: 'b1388d74-fb8c-4cd1-9f9b-9602189f165b',
          name: 'Salle cours MBDS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          uuid: '23ed0b0a-270d-4aff-a0d0-e2ac77a73626',
          name: 'Salle amphi A1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          uuid: 'd25a34b4-d50c-4c83-ad32-4ca3b0e2bc79',
          name: 'Salle amphi A2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('rooms', null, {}),
}
