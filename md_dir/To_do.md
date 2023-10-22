1. CRUD
    - mandatory
        - 검색 join이용
        - 채용공고 상세페이지
    - bonus
        - 검색결과
        - 상세페이지 항목에 해당 회사의 다른 공고 id를 list 형태 인자로 전달
        - user table
        - user가 직접 지원
2. sequelize
    - associate 적용
    - seeds 추가
3. 레이어드 아키텍쳐 적용
    - 관심사 별로 계층 분리
    - 단방향 의존성
    - 추상화된 인터페이스로만 소통
    - ref
        https://xxeol.tistory.com/26
    - router, controller, service 분리
3-1 readme 업데이트
4. 인증, 인가 로직 추가
    - JWT
    - 기업 회원가입
5. docker 적용
6. typescript 적용
7. AWS 적용
8. 유닛 테스트 적용 
    - 예외처리 로직분리 필요
9. Frontend
    - 간단하게 만들기
    - 회원가입 페이지
    - 로그인 페이지
    - 채용공고 
        - 리스트 및 전체 공고 보여주는 페이지
        - 등록 페이지
        - 수정 페이지
        - 삭제
        - 검색