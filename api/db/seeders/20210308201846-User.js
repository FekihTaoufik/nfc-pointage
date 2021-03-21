const crypto = require('crypto')
const _ = require('lodash')
const faker = require('faker')
module.exports = {
  up: (queryInterface, Sequelize) => {
    const countStudents = 60
    const countTeachers = 5
    console.log(faker.random.number(6))
    return queryInterface.bulkInsert(
      'users',
      [..._.times(countTeachers,
      (i)=>({
          id: (i+1),
          universityCardId: _.random(100000,300000),
          password: crypto
            .createHash('md5')
            .update(`teacher+${(i+1)}@unice`)
            .digest('hex'),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          role: 'TEACHER',
          email: `teacher+${i+1}@unice.fr`,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      ), ..._.times(countStudents,
      (i)=>({
          id: (i+countTeachers+1),
          universityCardId:  _.random(100000,300000),
          password: crypto
            .createHash('md5')
            .update(`student+${(i+countTeachers+1)}@etu.unice`)
            .digest('hex'),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          role: 'STUDENT',
          groupId :  _.random(1,4),
          email: `student+${(i+countTeachers+1)}@etu.unice.fr`,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      )]
      ,
      {}
    )
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),
}
