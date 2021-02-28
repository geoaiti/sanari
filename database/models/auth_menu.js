'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth_menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      auth_menu.hasMany(models.auth_menu, {
        foreignKey : 'parent_id'
      });

      auth_menu.belongsTo(models.auth_menu, {
        foreignKey : 'parent_id',
      });

      auth_menu.belongsTo(models.auth_permission_action, {
        foreignKey : 'permission',
      });
    }
  };
  auth_menu.init({
    name: DataTypes.STRING,
    icon: DataTypes.TEXT,
    parent_id: DataTypes.INTEGER,
    permission: DataTypes.INTEGER,
    sorter : DataTypes.INTEGER
  }, {
    defaultScope : {
      order : [
        ['sorter', 'ASC']
      ]
    },
    sequelize,
    paranoid: true,
    modelName: 'auth_menu',
  });
  return auth_menu;
};