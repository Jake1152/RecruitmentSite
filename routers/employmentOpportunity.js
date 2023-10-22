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

// 채용공고 읽기 - read all
/**
 * 채용공고가 엄청 많다면 불필요하게 많이 보내주는 것일 수 있다
 * select를 끊어서 결과를 보내주도록 한다
 * 이것은 view에서 얼마나 보여줄지에 따라 달라짐(page view,  무한 스크롤)
 */
router.get("/employment", async (req, res) => {
  try {
    const selectedEmploymentOpportunity = await EmploymentOpportunity.findAll();
    return res.status(200).json(selectedEmploymentOpportunity);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

// 채용공고 등록
router.post("/employment", async (req, res) => {
  // request obejct properties trim
  for (const [key, value] of Object.entries(req.body)) {
    if (typeof value === "string") req.body[key] = value.trim();
  }
  const {
    companyId,
    recruitmentJobPosition,
    recruitmentBonus,
    recruitmentContent,
    technicalSkill,
  } = req.body;
  try {
    if (
      !companyId ||
      !isNumericString(companyId) ||
      !recruitmentJobPosition ||
      !recruitmentBonus ||
      !isNumericString(recruitmentBonus) ||
      !recruitmentContent ||
      !technicalSkill
    )
      throw new Error("Validation issue");
  } catch (err) {
    console.error(err);
    return res.status(400).send("Bad request");
  }

  try {
    const selectedCompanyId = await findCompanyId(companyId);
    if (selectedCompanyId === null) return res.status(400).send("Bad request");
    const employmentOpportunity = {
      company_id: parseInt(companyId),
      position: recruitmentJobPosition,
      requirement_skill: technicalSkill,
      compensation: parseInt(recruitmentBonus),
      content: recruitmentContent,
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

// 공고 수정
router.put("/employment/:id", async (req, res) => {
  // request obejct properties trim
  for (const [key, value] of Object.entries(req.body)) {
    if (typeof value === "string") req.body[key] = value.trim();
  }
  const {
    employmentId,
    recruitmentJobPosition,
    recruitmentBonus,
    recruitmentContent,
    technicalSkill,
  } = req.body;
  try {
    if (
      !employmentId ||
      !isNumericString(employmentId) ||
      !recruitmentJobPosition ||
      !recruitmentBonus ||
      !isNumericString(recruitmentBonus) ||
      !recruitmentContent ||
      !technicalSkill
    )
      throw new Error("Validation issue");
  } catch (err) {
    console.error(err);
    return res.status(400).send("Bad request");
  }

  try {
    const employmentOpportunity = {
      position: recruitmentJobPosition,
      requirement_skill: technicalSkill,
      compensation: parseInt(recruitmentBonus),
      content: recruitmentContent,
    };

    const updatedEmploymentOpportunity = await EmploymentOpportunity.update(
      employmentOpportunity,
      {
        where: {
          id: employmentId,
        },
      },
    );
    return res.status(200).json(updatedEmploymentOpportunity);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

// 공고 삭제
router.delete("/employment/:id", async (req, res) => {
  // request obejct properties trim
  for (const [key, value] of Object.entries(req.body)) {
    if (typeof value === "string") req.body[key] = value.trim();
  }
  const { employmentId } = req.body;
  try {
    if (!employmentId || !isNumericString(employmentId))
      throw new Error("Validation issue");
  } catch (err) {
    console.error(err);
    return res.status(400).send("Bad request");
  }

  try {
    const destoriedEmploymentOpportunity = await EmploymentOpportunity.destroy({
      where: {
        id: employmentId,
      },
    });
    return res.status(200).json(destoriedEmploymentOpportunity);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
