const { Sequelize } = require("sequelize");

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

  // static associate(db) {
  //   db.Company.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  // }
}

console.log(`Company in /models : ${Company}`);
module.exports = Company;
