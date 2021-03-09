'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class attendance extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      })
      this.belongsTo(models.Sessions, {
        foreignKey: 'sessionId',
        as: 'session',
        onDelete: 'CASCADE',
      })
    }
  }
  attendance.init(
    {
      userId: DataTypes.INTEGER,
      sessionId: DataTypes.INTEGER,
      startedAt: DataTypes.DATE,
      endedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'attendance',
    }
  )
  return attendance
}
