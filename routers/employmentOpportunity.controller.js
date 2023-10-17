const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");

const { Company, EmploymentOpportunity } = require("../models");
// const { Company } = require("../models/company");
// const { Company, EmploymentOpportunity } = require("../models");
console.log(`Company in employmentOpportunity.js : ${Company}`);

// const createEmploymentOpportunity = async () => {
//   try {
//     const employmentOpportunity = await EmploymentOpportunity.findOrCreate({
//       where: { company_id },
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

const findCompanyId = async (companyId) => {
  try {
    // const dbComanyId = await Company.findOne({ where: { id: companyId } });
    console.log(`${Company}`);
    const dbComanyId = await Company.findAll();
    return dbComanyId;
  } catch (err) {
    console.error(err);
  }
};

// sequelize.sequelize.post
// Sequelize.
// router.get("/", (req, res) => {
//   res.send("This is employment endpoint");
// });

/**
 * test input
 * {
    "companyId": "sdf",
    "recruitmentJobPosition": "backend junior developer",
    "recruitmentBonus": "424200",
    "recruitementContent": "원티드 랩에서 백앤드 주니어 개발자 채용합니다. 자격요건 .. ",
    "technicalSkill": "Javascript"
  }
  // const {
  //   companyId,
  //   recruitmentJobPosition,
  //   recruitmentBonus,
  //   recruitementContent,
  //   technicalSkill,
  // } = {
  //   companyId: "",
  //   recruitmentJobPosition: "backend junior developer",
  //   recruitmentBonus: "424200",
  //   recruitementContent:
  //     "원티드 랩에서 백앤드 주니어 개발자 채용합니다. 자격요건 .. ",
  //   technicalSkill: "Javascript",
  // };
  //
 */
router.post("/employment", async (req, res) => {
  let { companyId } = req.body;
  const {
    recruitmentJobPosition,
    recruitmentBonus,
    recruitementContent,
    technicalSkill,
  } = req.body;
  try {
    companyId = parseInt(companyId);
    if (
      !companyId ||
      !recruitmentJobPosition ||
      !recruitmentBonus ||
      !recruitementContent ||
      !technicalSkill
    )
      throw new Error("Validation issue");
  } catch (err) {
    console.error(err);
    return res.status(400).send("Bad request");
  }

  try {
    console.log(`companyId: ${companyId}`);
    const sqlResult = await findCompanyId(companyId);
    console.log(`sqlResult: ${sqlResult}`);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
  return res.status(200).send("OK");
});

/**
 * create
 * read
 */
/**
 * 실행결과
 * {
        "company_id":company_id,
        "recruitment_job_position":"backend junior developer",
        "recruitment_bonus": 424200,
        "recruitement_content":"원티드 랩에서 백앤드 주니어 개발자 채용합니다. 자격요건 .. ",
        "technical_skill": "Javascript"
    }
 */
module.exports = router;
