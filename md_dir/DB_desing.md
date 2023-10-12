# 회사 table

- field

  - 회사 id (PK)
  - 회사 이름 (Unique)

- company table
  - id
  - name

# 채용공고 table

- 채용공고 id (PK)
- 회사 id (FK)
- 회사 이름
- 국가
- 지역
- 채용포지션
- 채용보상금
- 사용기술

- employment_opportunity table
  - id (PK)
  - company_id (FK refernce company table's id field)
  - company_name (FK refernce company table's name field))
  - working_country
  - working_location
  - position
  - requirement_skill
  - compensation
  - content

# 유저 table (Bonus)

- 유저 id
- 유저 nickname
- 지원한 공고? (보류)
  - 지원한 공고들을 리스트처럼 저장해야할 것으로 예상됨
  - DB에 array처럼 저장하는게 맞는가?
  - 더 좋은 방법은 없는가?
  - array로 저장한다고 할때 유저 table에 지원한 공고 id를 넣거나
  - 채용공고 table에 지원한 유저 id를 넣을 수 있을거 같다
  - 둘다에서 연관되므로 별도의 DB 자료구조를 이용해서 처리하는 것이 더 나을거 같다. 별도의 table 등등

# create table sql query

-- Create company table
CREATE TABLE company (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) UNIQUE
);

-- Create employment_opportunity table
CREATE TABLE employment_opportunity (
id INT AUTO_INCREMENT PRIMARY KEY,
company_id INT,
company_name VARCHAR(255) UNIQUE,
working_country VARCHAR(255),
working_location VARCHAR(255),
position VARCHAR(255),
requirement_skill VARCHAR(255),
compensation DECIMAL(10, 2),
content TEXT,
FOREIGN KEY (company_id) REFERENCES company(id),
FOREIGN KEY (company_name) REFERENCES company(name)
);
