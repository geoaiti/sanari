'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth_application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      auth_application.hasMany(models.auth_permission, {
        foreignKey : 'application',
      });
    }
  };
  auth_application.init({
    name: DataTypes.STRING,
    prefix: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'auth_application',
  });
  return auth_application;
};