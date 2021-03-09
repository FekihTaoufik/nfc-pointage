'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      this.hasMany(models.Attendance, {
        foreignKey: 'roomId',
        as: 'Attendances',
        onDelete: 'CASCADE',
      })
    }
  }
  Room.init(
    {
      uuid: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Room',
    }
  )
  return Room
}
