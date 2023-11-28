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

  /**
   * 회사는 채용공고랄 여러개 가질 수 있다
   * 채용공고 속에 회사는 1개이다
   * 채용공고:회사 = M:1
   */
  static associate(db) {
    db.EmploymentOpportunity.belongsTo(db.Company, {
      foreignKey: "company_id",
      target: "id",
    });
  }
}
// A.belongToMany.B
module.exports = EmploymentOpportunity;
