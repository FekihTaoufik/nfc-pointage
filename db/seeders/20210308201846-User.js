module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        id:10,
        username: 'student2',
        password: 'Azerty1234',
        firstName: 'Jon',
        lastName: 'Doe',
        role: 'STUDENT',
        email: 'student2@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:12,
        username: 'teacher2',
        password: 'Azerty1234',
        firstName: 'Sam',
        lastName: 'Pir',
        role: 'TEACHER',
        email: 'teacher2@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};