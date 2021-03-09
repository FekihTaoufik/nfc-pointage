'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class session extends Model {
    static associate(models) {
      this.hasMany(models.attendance, {
        foreignKey: 'sessionId',
        as: 'Attendances',
      });
      this.belongsTo(models.group, {
        foreignKey: 'groupId',
        as: 'Group',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.user, {
        foreignKey: 'teacherId',
        as: 'Teacher',
      });
      this.belongsTo(models.room, {
        foreignKey: 'roomId',
        as: 'Room',
      });
    }
  };
  session.init({
    name: DataTypes.STRING,
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      foreignKey: true,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      foreignKey: true,
      references: {
        model: 'group',
        key: 'id',
      },
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      foreignKey: true,
      references: {
        model: 'room',
        key: 'id',
      },
    },
    startedAt: DataTypes.DATE,
    endedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'session',
  });
  return session;
};