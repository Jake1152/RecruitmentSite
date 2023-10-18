const express = require("express");
const router = express.Router();

const { Company, EmploymentOpportunity } = require("../models");

// const createEmploymentOpportunity = async (employmentOpportunity) => {
//   try {
//     const employmentOpportunity = await EmploymentOpportunity.Create({
//       employmentOpportunity,
//     });
//     return employmentOpportunity;
//   } catch (err) {
//     console.error(err);
//   }
// };

const findCompanyId = async (companyId) => {
  try {
    const dbComanyId = await Company.findOne({ where: { id: companyId } });
    return dbComanyId;
  } catch (err) {
    console.error(err);
  }
};

function isNumericString(input) {
  const numericRegex = /^[0-9]*$/;
  return numericRegex.test(input);
}

/**
 * test input
 * {
    "companyId": "sdf",
    "recruitmentJobPosition": "backend junior developer",
    "recruitmentBonus": "424200",
    "recruitementContent": "원티드 랩에서 백앤드 주니어 개발자 채용합니다. 자격요건 .. ",
    "technicalSkill": "Javascript"
  }
 */
router.post("/employment", async (req, res) => {
  // request obejct properties trim
  for (const [key, value] of Object.entries(req.body)) {
    if (typeof value === "string") req.body[key] = value.trim();
  }
  const {
    companyId,
    recruitmentJobPosition,
    recruitmentBonus,
    recruitementContent,
    technicalSkill,
  } = req.body;
  try {
    if (
      !companyId ||
      !isNumericString(companyId) ||
      !recruitmentJobPosition ||
      !recruitmentBonus ||
      !isNumericString(recruitmentBonus) ||
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
    const selectedCompanyId = await findCompanyId(companyId);
    if (selectedCompanyId === null) return res.status(400).send("Bad request");
    // employmentOpportunity = {
    //   company_id : parseInt(companyId),
    //   working_country:
    //   company_id : parseInt(companyId),
    //   company_id : parseInt(companyId),

    // };
    // const createdEmploymentOpportunity = await createEmploymentOpportunity();
    // console.log("All companys:", JSON.stringify(selectedCompanyId, null, 2));
    // sqlResult.forEach((element) => {
    //   console.log(`element of sqlResult : ${element}`);
    //   console.log(`element.Company of sqlResult : ${element.Company}`);
    //   // element.Company;
    // });
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
        "companyId":companyId,
        "recruitment_job_position":"backend junior developer",
        "recruitment_bonus": 424200,
        "recruitement_content":"원티드 랩에서 백앤드 주니어 개발자 채용합니다. 자격요건 .. ",
        "technical_skill": "Javascript"
    }
 */
module.exports = router;
