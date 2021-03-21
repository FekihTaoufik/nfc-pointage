'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      this.hasMany(models.attendance, {
        foreignKey: 'userId',
        as: 'Attendances',
      })
      this.belongsTo(models.group, {
        foreignKey: 'groupId',
        as: 'Group',
      })
    }
  }
  user.init(
    {
      universityCardId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      role: DataTypes.STRING,
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true,
        references: {
          model: 'group',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'user',
      defaultScope: {
        attributes: {
          exclude: ['password']
        }
      }
    }
  )
  return user
}
