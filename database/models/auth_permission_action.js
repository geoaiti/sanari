'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth_permission_action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      auth_permission_action.hasMany(models.auth_role, {
        foreignKey : 'permission',
      });

      auth_permission_action.hasMany(models.auth_menu, {
        foreignKey : 'permission',
      });

      auth_permission_action.belongsTo(models.auth_action, {
        foreignKey : 'action',
      });

      auth_permission_action.belongsTo(models.auth_permission, {
        foreignKey : 'permission',
      });
    }
  };
  auth_permission_action.init({
    permission: DataTypes.INTEGER,
    action: DataTypes.INTEGER,
    data_argument : DataTypes.TEXT,
    url_pattern : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'auth_permission_action',
  });
  return auth_permission_action;
};