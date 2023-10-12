const { Sequelize, DataTypes } = require("sequelize");
const Company = require("./Company"); // Assuming you've defined the Company model

const EmploymentOpportunity = sequelize.define("EmploymentOpportunity", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  company_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Company,
      key: "id",
    },
  },
  company_name: {
    type: DataTypes.STRING,
    references: {
      model: Company,
      key: "name",
    },
  },
  working_country: {
    type: DataTypes.STRING,
  },
  working_location: {
    type: DataTypes.STRING,
  },
  position: {
    type: DataTypes.STRING,
  },
  requirement_skill: {
    type: DataTypes.TEXT,
  },
  compensation: {
    type: DataTypes.DECIMAL(10, 2),
  },
  content: {
    type: DataTypes.TEXT,
  },
});

module.exports = EmploymentOpportunity;
