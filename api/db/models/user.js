'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
  User.init(
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
          model: 'groups',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
