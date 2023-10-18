const express = require("express");
const router = express.Router();

const { Company, EmploymentOpportunity } = require("../models");

const createEmploymentOpportunity = async (employmentOpportunity) => {
  try {
    console.log(
      "All employmentOpportunity:",
      JSON.stringify(employmentOpportunity, null, 2),
    );
    const employmentOpportunityResult = await EmploymentOpportunity.create(
      employmentOpportunity,
    );
    return employmentOpportunityResult;
  } catch (err) {
    console.error(err);
  }
};

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
    const employmentOpportunity = {
      company_id: parseInt(companyId),
      position: recruitmentJobPosition,
      requirement_skill: technicalSkill,
      compensation: parseInt(recruitmentBonus),
      content: recruitementContent,
    };
    console.log(`# employmentOpportunity : ${employmentOpportunity}`);
    const createdEmploymentOpportunity = await createEmploymentOpportunity(
      employmentOpportunity,
    );
    return res.status(201).json(createdEmploymentOpportunity);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
