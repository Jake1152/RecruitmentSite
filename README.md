# wanted-pre-onboarding-backend

# 무슨 프로젝트인가?

```
wanted pre-onboarding 사전과제
채용공고에 대한 CRUD API를 구현한 프로그램(인증로직 제외버젼)
```


# 환경구축 (window, linux 기준)

0. node, mysql Ver 8.0 설치
  - node 12.22.9
  - npm 10.2.5
1. MySQL 데이터베이스 생성
  ```
    CREATE [your database];
    USE [your database];
  ```
2. npm install
3. npm start
4. company table에 데이터 추가 
  - 3.번 항목에서 서비스가 실행되면서 company테이블 등이 생성된 상태이며 아직 데이터는 없음.
  - 아래의 명령어를 이용하여 회사 데이터를 추가합니다
  ```
    INSERT INTO company (name, country, location) values ('Inflab', '대한민국', '판교'), ('RIDI', '한국', '서울'), ('GOOGLE', 'USA', 'LA'), ('FIXAR', 'USA', 'New York'), ('SKELTER LABS', 'Korea', 'Seoul'), ('VOYGER X', 'Korea', 'Seoul');
  ```

## Postman

### 채용공고 등록
![Alt text](./images/postImage.png)
### 채용공고 수정
![Alt text](./images/putImage.png)

### 채용공고 검색
#### 전체검색
![Alt text](./images/image-2.png)

#### 특정 공고 검색
![Alt text](./images/image-3.png)

### 채용공고 삭제
![Alt text](./images/deleteImage.png)


# DB

## table 구조

- company (회사)
![Alt text](./images/image-0.png)


- employment_opportunity (공고)
![Alt text](./images/image-1.png)


# 요구사항

1. 채용공고 등록

- 회사는 아래 데이터와 같이 채용 공고를 등록한다.

  - Example) # 데이터 예시이며, 필드명은 임의로 설정가능합니다.
  {
    "회사\_id":회사\_id,
    "채용포지션":"백엔드 주니어 개발자",
    "채용보상금":1000000,
    "채용내용":"원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
    "사용기술":"Python"
  }

2. 채용공고 수정
   // put, patch method

- 회사는 아래 데이터와 같이 채용공고를 수정합니다(회사 id이외 모두 수정가능)

  - Example) # 데이터 예시이며, 필드명은 임의로 설정가능합니다.
    {
      "채용포지션":"백엔드 주니어 개발자",
      "채용보상금":1500000, # 변경됨
      "채용내용":"원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 자격요건은..", # 변경됨
      "사용기술":"Python"
    }

    or

    {
      "채용포지션":"백엔드 주니어 개발자",
      "채용보상금":1000000,
      "채용내용":"원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
      "사용기술":"Django" # 변경됨
    }

3. 채용공고 삭제

- DB에서 삭제

4. 채용공고 목록 가져오기

   - 4-1. 사용자는 채용공고 목록을 아래와 같이 확인할 수 있다.
   - Example)
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
   - 4-2 채용공고 검색 기능 구현(선택사항)
   - # Example - 1) some/url?search=원티드

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

     - # Example - 2) some/url?search=Django

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

5. 채용 상세 페이지 가져오기

- 사용자는 채용상세 페이지를 아래와 같이 확인할 수 있다
  - 채용내용이 추가적으로 담겨있다
  - 해당 회사가 올린 다른 채용공고가 추가적으로 포함된다(선택사항)
  - Example)
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

6. 사용자는 채용공고에 지원한다 (선택사항)

- 사용자는 채용공고에 아래와 같이 지원한다
  - 사용자는 1회만 지원 가능하다
  - example)
    {
      "채용공고\_id": 채용공고\_id,
      "사용자\_id": 사용자\_id
    }

# 요구 사항 분석 & 구현 과정
## 문제 재정의

- 채용공고 사이트를 만든다
- 채용공고를 등록, 수정, 삭제, 검색할 수 있게 구현한다
  - 수정의 경우 회사 id외에는 전부 수정 가능
- DB는 RDB를 쓰며, ORM을 사용해야한다.

## 문제해결방법

- 작고 쉬운 것부터 구현한다

  - server 생성
  - mysql 구성

    - CRUD에 필요한 table 및 field구성

      - Wanted, Linkedin 등 여러 채용사이트 항목을 분석하여 결정.
      - 아래 예시는 어디까지나 예시이면 변경가능!!
      - 테이블 1~2개

        - 테이블 하나에 필요한 필드 전부 구성하거나 테이블을 2개로 만들어서 회사 id를 이용해서 필요한 필드들은 두 테이블을 join해서 사용한다.

      - 항목 리스트 (필드 항목들 수정가능)

        - 공통항목
          "채용공고\_id": 채용공고\_id,
          "회사명":"네이버",
          "국가":"한국",
          "지역":"판교",
          "채용포지션":"Django 백엔드 개발자",
          "채용내용":"원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
          "채용보상금":1000000,
          "사용기술":"Django"

        - 각 endpoint별 항목

          - Create, Update
            "회사\_id":회사\_id,
            "채용포지션":"백엔드 주니어 개발자",
            "채용보상금":1000000,
            "채용내용":"원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
            "사용기술":"Python"

          - Read
            "채용공고\_id": 채용공고\_id,
            "회사명":"네이버",
            "국가":"한국",
            "지역":"판교",
            "채용포지션":"Django 백엔드 개발자",
            "채용보상금":1000000,
            "사용기술":"Django"

          - Delete
            "회사 id"

    - sequelize 사용
    - 실행 순서 및 방법 명시
      - node, npm install
      - npm i
      - npm start
      - npmx sequelize DB:create

  - CRUD 순서로 진행
    - Create
    - Read
    - Update
    - Delete

- 테스트 환경구축
  - api호출하여 처리
    - swagger
  - 매우매우 간단한 UI 구성?!
- clone 받는 사람이 구성해서 쓸 수 있게 구성한다.
  - 설정한 환경으로 되도록 지원 shell script 혹은 구성환경 표기
    - window, liunux

## 순서요약

0. 채용사이트 공고 항목 분석
1. DB 설계
2. 환경구축
   - DB, node package, etc
3. 테스트 환경 구축
   - swagger and postman
   - 테스트 기법 탐색(구글링, 테스트 책 참조)
   - simple front UI? (고려)
4. 코딩
   - simple server
   - DB connect
   - Register "Employment Opportunity"
   - Read "Employment Opportunity"
   - Modify "Employment Opportunity"
   - Remove "Employment Opportunity"

