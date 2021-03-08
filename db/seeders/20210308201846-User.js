module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        username: 'student1',
        password: 'Azerty1234',
        firstName: 'Jon',
        lastName: 'Doe',
        role: 'STUDENT',
        email: 'student1@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'teacher1',
        password: 'Azerty1234',
        firstName: 'Sam',
        lastName: 'Pir',
        role: 'TEACHER',
        email: 'teacher1@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};