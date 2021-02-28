'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth_action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      auth_action.hasMany(models.auth_permission_action, {
        foreignKey : 'action'
      });
    }
  };
  auth_action.init({
    name: DataTypes.STRING,
    prefix: DataTypes.STRING,
    data: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'auth_action',
  });
  return auth_action;
};