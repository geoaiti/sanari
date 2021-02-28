'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      auth_permission.hasMany(models.auth_permission_action, {
        foreignKey : 'permission',
      });

      auth_permission.belongsTo(models.auth_application, {
        foreignKey : 'application',
      });

      auth_permission.belongsTo(models.auth_modul, {
        foreignKey : 'modul',
      });
    }
  };
  auth_permission.init({
    application: DataTypes.INTEGER,
    modul: DataTypes.INTEGER,
    metode: DataTypes.STRING,
    title : DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'auth_permission',
  });
  return auth_permission;
};