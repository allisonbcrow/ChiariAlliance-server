const { DataTypes } = require("sequelize");
const db = require("../db");
const Daily = db.define("daily", {

    food: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    water: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sleep: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stressLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exercise: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    painLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    other: {
      type: DataTypes.STRING(1500),
      allowNull: false,
    }
  });

  module.exports = Daily;

