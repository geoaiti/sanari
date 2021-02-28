'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth_modul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      auth_modul.hasMany(models.auth_permission, {
        foreignKey : 'modul',
      });

      auth_modul.hasMany(models.auth_modul, {
        foreignKey : 'parent_id',
      });

      auth_modul.belongsTo(models.auth_modul, {
        foreignKey : 'parent_id',
      });
    }
  };
  auth_modul.init({
    name: DataTypes.STRING,
    prefix: DataTypes.STRING,
    description: DataTypes.TEXT,
    generation : DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'auth_modul',
  });
  return auth_modul;
};