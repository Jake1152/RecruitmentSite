"use strict";

const Sequelize = require("sequelize");
const Company = require("./company");
const EmploymentOpportunity = require("./employmentOpportunity");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.sequelize = sequelize;

db.Company = Company;
db.EmploymentOpportunity = EmploymentOpportunity;

Company.initiate(sequelize);
EmploymentOpportunity.initiate(sequelize);

Company.associate(db);
EmploymentOpportunity.associate(db);

module.exports = db;
