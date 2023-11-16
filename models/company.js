const { Sequelize } = require("sequelize");
// const EmploymentOpportunity = require("./employmentOpportunity");

class Company extends Sequelize.Model {
  static initiate(sequelize) {
    Company.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          unique: true,
        },
        country: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Company",
        tableName: "company",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    );
  }

  static associate(db) {
    db.Company.hasMany(db.EmploymentOpportunity, {
      foreignKey: "company_id",
      sourceKey: "id",
    });
  }
}

console.log(`Company in /models : ${Company}`);
module.exports = Company;
