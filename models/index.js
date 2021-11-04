const User = require("./user");
const Medical = require("./medical");
const Daily = require("./daily")
// create individual files for your models and import them here
User.hasOne(Medical);
Medical.belongsTo(User);

User.hasMany(Daily);
Daily.belongsTo(User);
// Setup Associations

module.exports = {
  User,
  Daily,
  Medical
};
