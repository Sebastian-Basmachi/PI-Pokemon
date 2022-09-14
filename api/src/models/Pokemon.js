const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.REAL,
      unique: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.REAL,
      defaultValue: 1
    },
    attack: {
      type: DataTypes.REAL,
      defaultValue: 1
    },
    defense: {
      type: DataTypes.REAL,
      defaultValue: 1
    },
    speed: {
      type: DataTypes.REAL,
      defaultValue: 1
    },
    height: {
      type: DataTypes.REAL,
      defaultValue: 1
    },
    weight: {
      type: DataTypes.REAL,
      defaultValue: 1
    },
    like: {
      type: DataTypes.STRING
    },

      //fijarse si lo dejo o lo saco

    image: {
      type: DataTypes.STRING
    }
  });
};
