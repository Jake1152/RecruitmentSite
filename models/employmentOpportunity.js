const Sequelize = require("sequelize");
const Company = require("./company"); // Assuming you've defined the Company model

class EmploymentOpportunity extends Sequelize.Model {
  static initiate(sequelize) {
    EmploymentOpportunity.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        company_id: {
          type: Sequelize.INTEGER,
          references: {
            model: Company,
            key: "id",
          },
        },
        working_country: {
          type: Sequelize.STRING,
        },
        working_location: {
          type: Sequelize.STRING,
        },
        position: {
          type: Sequelize.STRING,
        },
        requirement_skill: {
          type: Sequelize.STRING,
        },
        compensation: {
          type: Sequelize.DECIMAL(10, 2),
        },
        content: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "EmploymentOpportunity",
        tableName: "employment_opportunity",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    );
  }

  // static associate(db) {
  //   db.EmploymentOpportunity.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  // }
}

module.exports = EmploymentOpportunity;
