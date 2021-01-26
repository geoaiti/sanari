'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth_account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      auth_account.belongsTo(models.user, {});

      auth_account.hasMany(models.auth_user_role, {
        foreignKey : 'user',
        // as : 'user_role'
      });
    }
  };
  auth_account.init({
    // userId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'auth_account',
  });
  return auth_account;
};