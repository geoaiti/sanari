'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      auth_role.belongsTo(models.auth_group, {
        foreignKey : 'group',
      });

      auth_role.belongsTo(models.auth_permission, {
        foreignKey : 'permission',
      });
    }
  };
  auth_role.init({
    group: DataTypes.INTEGER,
    permission: DataTypes.INTEGER,
    is_default : DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'auth_role',
  });
  return auth_role;
};