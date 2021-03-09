'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.user, {
        foreignKey: 'groupId',
        as: 'Users',
      })
      this.hasMany(models.session, {
        foreignKey: 'groupId',
        as: 'Sessions',
      })
    }
  }
  group.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'group',
    }
  )
  return group
}
