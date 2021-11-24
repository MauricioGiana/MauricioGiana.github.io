const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('favorite', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })
};