# Create

- /employment-opportunities

{
"company_id":company_id,
"recruitment_job_position":"backend junior developer",
"recruitment_bonus": 424200,
"recruitement_content":"원티드 랩에서 백앤드 주니어 개발자 채용합니다. 자격요건 .. ",
"technical_skill": "Javascript"
}

# Read

## 공고 검색

### case 1

- /employment-opportunities
  [
  {
  "채용공고_id": 채용공고_id,
  "회사명":"원티드랩",
  "국가":"한국",
  "지역":"서울",
  "채용포지션":"백엔드 주니어 개발자",
  "채용보상금":1500000,
  "사용기술":"Python"
  },
  {
  "채용공고_id": 채용공고_id,
  "회사명":"네이버",
  "국가":"한국",
  "지역":"판교",
  "채용포지션":"Django 백엔드 개발자",
  "채용보상금":1000000,
  "사용기술":"Django"
  },
  ...
  ]

### case 2

- /employment-opportunities?search=원티드

  [
  {
  "채용공고_id": 채용공고_id,
  "회사명":"원티드랩",
  "국가":"한국",
  "지역":"서울",
  "채용포지션":"백엔드 주니어 개발자",
  "채용보상금":1500000,
  "사용기술":"Python"
  },
  {
  "채용공고_id": 채용공고_id,
  "회사명":"원티드코리아",
  "국가":"한국",
  "지역":"부산",
  "채용포지션":"프론트엔드 개발자",
  "채용보상금":500000,
  "사용기술":"javascript"
  }
  ]

- /employment-opportunities?search=Django
  [
  {
  "채용공고_id": 채용공고_id,
  "회사명":"네이버",
  "국가":"한국",
  "지역":"판교",
  "채용포지션":"Django 백엔드 개발자",
  "채용보상금":1000000,
  "사용기술":"Django"
  },
  {
  "채용공고_id": 채용공고_id,
  "회사명":"카카오",
  "국가":"한국",
  "지역":"판교",
  "채용포지션":"Django 백엔드 개발자",
  "채용보상금":500000,
  "사용기술":"Python"
  }
  ...
  ]

## 채용 상세 페이지 가져오기

- /employment-opportunities/:id

  {
  "채용공고\_id": 채용공고\_id,
  "회사명":"원티드랩",
  "국가":"한국",
  "지역":"서울",
  "채용포지션":"백엔드 주니어 개발자",
  "채용보상금":1500000,
  "사용기술":"Python",
  "채용내용": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
  "회사가올린다른채용공고":[채용공고_id, 채용공고_id, ..] # id List (선택사항 및 가산점요소).
  }

# Update

- /employment-opportunities/:id

  {
  "채용포지션":"백엔드 주니어 개발자",
  "채용보상금":1500000, # 변경됨
  "채용내용":"원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 자격요건은..", # 변경됨
  "사용기술":"Python"
  }

# Delete

- /employment-opportunities/:id
  200
