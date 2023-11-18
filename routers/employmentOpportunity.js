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
/**
 * raw: true 를 쓸때 최선의 방법이라 생각되는 것
 * 공식문서와 여러곳은 확인해보았지만 딱히 뭐가 없는거 같다
 * const selectedEmploymentOpportunity = await EmploymentOpportunity.findAll({
  include: {
    model: Company,
    attributes: ["name", "country", "location"],
    required: true,
  },
  raw: true, // Get raw JSON data directly
});

const transformedResult = selectedEmploymentOpportunity.map(row => ({
  채용공고_id: row.채용공고_id,
  국가: row.국가,
  지역: row.지역,
  채용포지션: row.채용포지션,
  채용내용: row.채용내용,
  채용보상금: row.채용보상금,
  사용기술: row.사용기술,
  name: row['Company.name'], // Rename the attribute from "Company.name" to "name"
  country: row['Company.country'],
  location: row['Company.location'],
}));

console.log(transformedResult);
 */
router.get("/", async (req, res) => {
  try {
    const selectedEmploymentOpportunity = await EmploymentOpportunity.findAll({
      include: {
        model: Company,
        attributes: ["name", "country", "location"],
        // required: true,
      },
      // attributes: ,
      attributes: [
        "id",
        "position",
        "compensation",
        "requirement_skill",
        [(sequelize.literal("Company.name"), "name")],
      ],
      // attributes: {
      //   include: ["Company.name", "Company.country", "Company.location"],
      // },
      raw: true,
      // nested: false,
      // attributes: {
      //   include: {
      //     model: Company,
      //     attributes: ["name", "country", "location"],
      //   },
      // },
    });
    console.log(
      `# selectedEmploymentOpportunity: ${JSON.stringify(
        selectedEmploymentOpportunity,
        null,
        2,
      )}`,
    );
    return res.status(200).json(selectedEmploymentOpportunity);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

// 특정 채용공고 읽기 - read
/**
 * 채용공고가 엄청 많다면 불필요하게 많이 보내주는 것일 수 있다
 * select를 끊어서 결과를 보내주도록 한다
 * 이것은 view에서 얼마나 보여줄지에 따라 달라짐(page view,  무한 스크롤)
 */
router.get("/:id", async (req, res) => {
  try {
    const selectedEmploymentOpportunity = await EmploymentOpportunity.findOne({
      where: { id: req.params.id },
    });
    return res.status(200).json(selectedEmploymentOpportunity);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

// 채용공고 등록
router.post("/", async (req, res) => {
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
// //:id
router.put("//:id", async (req, res) => {
  // request obejct properties trim
  for (const [key, value] of Object.entries(req.body)) {
    if (typeof value === "string") req.body[key] = value.trim();
  }
  // router.
  const {
    recruitmentJobPosition,
    recruitmentBonus,
    recruitmentContent,
    technicalSkill,
  } = req.body;
  let { id } = req.params;
  // id = id.trim(); // 사용자가 잘못된 URL => "//1 " "1 " 1뒤에 " "을 날리는게 맞지 않을 수
  console.log(`id: #${id}#`);
  try {
    if (
      !id ||
      !isNumericString(id) ||
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
          id: id,
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
router.delete("//:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id || !isNumericString(id)) throw new Error("Validation issue");
  } catch (err) {
    console.error(err);
    return res.status(400).send("Bad request");
  }

  try {
    const destoriedEmploymentOpportunity = await EmploymentOpportunity.destroy({
      where: {
        id: id,
      },
    });
    if (destoriedEmploymentOpportunity) {
      return res.status(200).json({
        message: "데이터 삭제 성공",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
