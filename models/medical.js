const { DataTypes } = require("sequelize");
const db = require("../db");
const Medical = db.define("medical", {
	
  medicalConditions: {
    type: DataTypes.STRING(1500),
    allowNull: false,
  },
  previousSurgeries: {
    type: DataTypes.STRING(1500),
    allowNull: true,
  },
  previousHospitalizations: {
    type: DataTypes.STRING(1500),
    allowNull: true,
  },
  currentMedications: {
    type: DataTypes.STRING(1500),
    allowNull: true,
  },
  allergies: {
    type: DataTypes.STRING(1500),
    allowNull: true,
  },
  height: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  other: {
    type: DataTypes.STRING(1500),
    allowNull: true,
  }
});

module.exports = Medical;
