'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Presence, {
        foreignKey: 'userId',
        as: 'presences',
      })
      this.belongsTo(models.Group, {
        foreignKey: 'groupId',
        as: 'Group',
      })
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
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
