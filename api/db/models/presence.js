'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'student',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Rooms, {
        foreignKey: 'roomId',
        as: 'room',
        onDelete: 'CASCADE',
      });
    }
  };
  Presence.init({
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    meeting: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Presence',
  });
  return Presence;
};