'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class attendance extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      })
      this.belongsTo(models.session, {
        foreignKey: 'sessionId',
        as: 'session',
        onDelete: 'CASCADE',
      })
    }
  }
  attendance.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      sessionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true,
        references: {
          model: 'session',
          key: 'id',
        },
      },
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
