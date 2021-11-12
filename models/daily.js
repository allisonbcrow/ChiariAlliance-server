const { DataTypes } = require("sequelize");
const db = require("../db");
const Daily = db.define("daily", {
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    food: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    water: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sleep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stressLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exercise: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    painLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    other: {
      type: DataTypes.STRING(1500),
      allowNull: false,
    }
  });

  module.exports = Daily;

