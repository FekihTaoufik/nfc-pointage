'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    static associate(models) {
      this.hasMany(models.session, {
        foreignKey: 'roomId',
        as: 'Sessions',
        onDelete: 'CASCADE',
      })
    }
  }
  room.init(
    {
      uuid: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'room',
    }
  )
  return room
}
