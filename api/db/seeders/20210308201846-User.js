const crypto = require('crypto')
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          username: 'student',
          password: crypto
            .createHash('md5')
            .update('nfc-pointeur')
            .digest('hex'),
          firstName: 'Jon',
          lastName: 'Doe',
          role: 'STUDENT',
          email: 'student@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          username: 'teacher2',
          password: crypto
            .createHash('md5')
            .update('nfc-pointeur')
            .digest('hex'),
          firstName: 'Sam',
          lastName: 'Pir',
          role: 'TEACHER',
          email: 'teacher2@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),
}
