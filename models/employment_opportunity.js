const { Sequelize, DataTypes } = require("sequelize");
const Company = require("./company"); // Assuming you've defined the Company model

class EmploymentOpportunity extends Sequelize.Model {
  static initiate(sequelize) {
    EmploymentOpportunity.init({
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
        type: DataTypes.STRING,
      },
      compensation: {
        type: DataTypes.DECIMAL(10, 2),
      },
      content: {
        type: DataTypes.TEXT,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Employment_opportunity',
      tableName: 'employment_opportunity',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  // static associate(db) {
  //   db.EmploymentOpportunity.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  // }
};

module.exports = EmploymentOpportunity;
