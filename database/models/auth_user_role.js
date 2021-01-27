'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth_user_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      auth_user_role.belongsTo(models.auth_account, {
        foreignKey : 'user',
      });
      // auth_user_role.belongsTo(models.auth_account);

      auth_user_role.belongsTo(models.auth_group, {
        foreignKey : 'group',
      });
    }
  };
  auth_user_role.init({
    user: DataTypes.INTEGER,
    group: DataTypes.INTEGER,
    is_default : DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'auth_user_role',
  });
  return auth_user_role;
};