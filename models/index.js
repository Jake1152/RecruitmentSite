"use strict";

const Sequelize = require("sequelize");
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(config.database, config);
db.sequelize = sequelize;

moduile.exports = db;
