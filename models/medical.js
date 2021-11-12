const { DataTypes } = require("sequelize");
const db = require("../db");
const Medical = db.define("medical", {
	
  // date: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  medicalConditions: {
    type: DataTypes.STRING(1500),
    allowNull: false,
  },
  previousSurgeries: {
    type: DataTypes.STRING(1500),
    allowNull: false,
  },
  previousHospitalizations: {
    type: DataTypes.STRING(1500),
    allowNull: false,
  },
  currentMedications: {
    type: DataTypes.STRING(1500),
    allowNull: false,
  },
  allergies: {
    type: DataTypes.STRING(1500),
    allowNull: false,
  },
  height: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  other: {
    type: DataTypes.STRING(1500),
    allowNull: false,
  }
});

module.exports = Medical;
