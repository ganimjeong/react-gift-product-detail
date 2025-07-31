# react-gift-login

<details>
<summary>1단계 구현기능 목록 보기</summary>
<div markdown="1">

## 📌 1단계 - 구현한 기능 목록

### 1. 기본 설정

- 불필요한 파일 및 코드 정리
- README 작성

### 2. Alias 설정

- 절대경로 import를 위한 alias 설정

### 3. Prettier 설정

- Prettier 설치
- 프로젝트 내 코드 포매팅 적용

### 4. Emotion 스타일 라이브러리 적용

- `@emotion/react`, `@emotion/styled` 설치
- 전역 스타일(GlobalStyle) 적용

### 5. 기본 폰트 설정

- Pretendard 폰트를 기본 폰트로 적용

### 6. reset.css 적용

- 전역 스타일(GlobalStyle) 에 포함시키기

---

### 리팩토링 1 : 타입스크립트 설치

### 리팩토링 2 : alias 적용해 코드수정

- alias가 인식 안되던 문제 해결
- tsx파일들을 alias 주소를 사용하도록 수정

### 리팩토링 3 : 빌드

- 프로젝트 빌드 결과물(dist) 추가

</div>
</details>

<details>
<summary>2단계 구현기능 목록 보기</summary>
<div markdown="1">
  
## 📌 2단계 - 구현한 기능 목록

### 1. 디자인 토큰 설정

- emotion에 Color, Typography 토큰을 설정

### 2. Mobile First Layout 기반 환경 구축

- 화면의 max-width를 720px으로 제한

### 3. UI - 상단 네비게이션 바

### 4. UI - 카테고리

- Flex, Grid 등을 활용

### 5. UI - 기타 섹션

- 선물한 친구 선택 UI 구현
- 카테캠 화이팅 배너 구현

### 5. UI - 실시간 급상승 선물랭킹

- 목 데이터 기반 랭킹 UI 구현

</div>
</details>

<details>
<summary>3단계 구현기능 목록 보기</summary>
<div markdown="1">

## 📌 3단계 - 구현한 기능 목록

### 1. 🔐 로그인 기능

- `/login` 페이지 접속 시 로그인 화면 표시
- 로그인 버튼 클릭 시 이전 페이지로 리디렉션 (없을 경우 `/`으로 이동)
- 로그인 상태 유지 기능은 구현하지 않음 (단순 라우팅 기반)

### 2. 🚫 Not Found 페이지

- 존재하지 않는 경로로 접근 시 Not Found 페이지로 이동

### 3. 🧭 네비게이션 바

- 로그인 버튼 추가 (로그인 페이지로 이동)
- 뒤로가기 버튼 추가 (이전 페이지로 이동)

### 4. 🎁 선물하기 메인 페이지 - 실시간 급상승 선물랭킹

- 성별/주제 필터 적용 시 새로고침 이후에도 필터 상태가 유지되도록 구현 (URL 파라미터 또는 상태 저장 방식 활용)
- 버튼, 카드 등 공통 요소를 별도의 컴포넌트로 분리하여 재사용성 향상

---

### 리팩토링

- 글로벌 스타일에 Pretendard 웹폰트 적용 안되는 문제 해결

- 목데이터에 타입 추가 및 아이디값을 다르게 하도록 맵함수 추가

</div>
</details>

---

# react-gift-order

<details>
<summary>1단계 구현기능 목록 보기</summary>
<div markdown="1">

## 📌 1단계 - 구현 기능 목록

### 1. ID 입력 유효성 검증

- 빈 값일 경우: ID를 입력해주세요.

- 이메일 형식이 아닐 경우: ID는 이메일 형식으로 입력해주세요.

- 유효한 경우: 에러 메시지 제거

### 2. PW 입력 유효성 검증

- 빈 값일 경우: PW를 입력해주세요.

- 8자 미만일 경우: PW는 최소 8글자 이상이어야 합니다.

- 유효한 경우: 에러 메시지 제거

### 3. 로그인 버튼 상태 처리

- ID와 PW가 모두 유효할 때만 버튼 활성화 (disabled → false)

- 그 외에는 비활성화

- LoginFormSection에서 커스텀 훅 사용

</div>
</details>

<details>
<summary>2단계 구현기능 목록 보기</summary>
<div markdown="1">

## 📌 2단계 - 구현 기능 목록

### 1. 로그인 정보 관리

- Context API를 활용해 로그인 상태를 전역에서 관리

- 메인 페이지에서 새로고침해도 로그인 정보 유지

- 로그인 성공 시 마이페이지(/my)로 이동 가능
  - 마이페이지는 로그인한 사용자만 접근 가능, 미로그인 시 로그인 페이지로 리다이렉트

- 마이페이지에서 로그아웃 시 로그인 페이지(/login)로 이동

### 2. 주문하기 페이지 UI 및 로직 구현

- 상품 아이템 클릭 시 주문하기 페이지로 이동

- 로그인하지 않은 경우 로그인 유도 후 주문하기 접근 허용

- 주문하기 페이지에 참고 URL 기능 반영
  - 메세지카드 선택 기능
  - 메세지카드 프리뷰 기능
  - 섹션디바이더 컴포넌트 재사용
  - 인풋박스 재사용
  - '주문하기' 바텀 버튼 컴포넌트 화면에 고정
  - 바텀 버튼을 누를 시에만 유효성검사 에러메세지가 등장

- 제출 버튼 클릭 시 아래 유효성 검사 조건 미충족 시 각 입력 필드별 안내 메시지 표시
  - 메시지는 반드시 입력되어야 함
  - 보내는 사람 이름은 반드시 입력되어야 함
  - 받는 사람 이름은 반드시 입력되어야 함
  - 받는 사람 전화번호는 반드시 입력되고, 전화번호 형식(01012341234)에 맞아야 함
  - 수량은 1 이상이어야 함

</div>
</details>

<details>
<summary>3단계 구현기능 목록 보기</summary>
<div markdown="1">

## 📌 3단계 - 구현 기능 목록

### 1. 폼 리팩터링 및 유효성 검사 고도화

- React Hook Form + Zod(선택)를 사용하여 주문하기 폼 리팩터링

- useState로 직접 입력값을 관리하지 않고, RHF으로 전환

- Zod를 활용해 유효성 검사 스키마 작성 (선택 사항이지만 권장)

### 2. 받는 사람 기능 고도화

- 받는 사람 정보를 최대 10명까지 등록 가능하게 구현

- 모든 입력값(10명의 정보)이 유효해야만 폼에 반영됨
  - 전화번호 중복 불가
  - 전화번호는 01012341234 형태만 허용
  - 최소 수량은 1개 이상이어야 함

- 참고 URL 기반으로 UI 구성

hint : 받는 사람 기능 구현할 때 useFieldArray 사용?

### 3. 주문하기 페이지 기능 강화

- 참고 URL을 기반으로 변경된 기능 구현

- 기능 단위 커밋 및 재사용 가능한 컴포넌트/훅 구조 고려

</div>
</details>

---

# react-gift-product-list

<details>
<summary>1단계 구현기능 목록 보기</summary>
<div markdown="1">

## 📌 1단계 - 구현 기능 목록

- API 서버 : https://github.com/next-step/react-gift-mock-server/tree/main/src

- git pull 받아 로컬에서 실행 후 로컬 서버를 사용하여 API를 요청하는 방식으로 작업할 것

### 1. 선물하기 홈 > 선물 테마 섹션

- `/api/themes` API를 사용하여 테마 목록을 완성

- 데이터를 불러오는 동안 로딩 화면 뜨도록 하기

- 데이터가 없거나, 에러가 발생하면 선물 테마 섹션이 보여지지 않게 하기

### 2. 선물하기 홈 > 실시간 급상승 선물랭킹 섹션

- `/api/products/ranking` API를 사용하여 실시간 급상승 선물 랭킹 섹션 완성

- API 명세에 따라 각 필터 선택 시 해당 필터에 맞는 API 재요청

- 데이터를 불러오는 동안 로딩 화면 뜨도록 하기

- 보여 줄 상품 목록이 없을경우 상품 목록이 없다는 문구 띄우기

</div>
</details>

<details>
<summary>2단계 구현기능 목록 보기</summary>
<div markdown="1">

## 📌 2단계 - 구현 기능 목록

### 1. 로그인 기능

- `/login` api 를 사용해서 로그인 기능 완성
- 로그인 성공 시 내려오는 authToken과 email, name을 userInfo storage에 저장하고 활용
- 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주세요.
  - react-toastify 라이브러리 사용

### 2. 주문하기 기능

- `/products/:productId/summary` api를 사용하여 제품 정보 가져오기
- 만약 제품 정보 API에서 4XX 에러가 발생하면 Toast를 통해 에러메시지 + 선물하기 홈으로 연결.
- 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 채워놓기

- `/order` api를 사용하여 주문하기 기능을 완성
- 주문하기 API의 경우 Authorization헤더에 로그인 응답에서 전달 받은 authToken을 넣어야만 동작하도록 하기
- 주문하기 API에서 401 에러가 발생하면 로그인 페이지로 연결

</div>
</details>

<details>
<summary>3단계 구현기능 목록 보기</summary>
<div markdown="1">

## 📌 3단계 - 구현 기능 목록

### 1. 테마 상품 목록 페이지

- `선물하기 홈 > 선물 테마` 섹션의 아이템을 클릭하면 각각 테마의 상품 목록 페이지로 연결

- 히어로 영역과 상품 목록 UI

### 2. 히어로 영역 API 연결

- `/api/themes/:themeId/info` API를 사용하여 선물 테마 섹션의 히어로 영역을 구현

- 테마 정보를 가져오는 API가 404 에러가 발생하면 선물하기 홈 페이지로 연결

-> 이부분은 기존의 `useFetch`훅을 재사용할 수 있을 것 같다.

### 3. 상품 리스트 영역 API 연결

- `/api/themes/:themeId/products` API를 사용하여 상품 리스트를 구현

- 무한 스크롤 기능을 구현

- 상품 리스트가 없으면 빈 페이지를 보여주기

-> 무한스크롤 하려면 기존 훅 재사용하지 않는 게 좋을 것 같다.

</div>
</details>

---

# react-gift-product-detail

## 📌 1단계 - 구현 기능 목록

- 기존에 작성했던 API를 React Query를 이용해서 리팩터링

### 1. React Query 사용하기 : GET

- useFetch 훅 대신 ReactQuery를 사용하는 useReactQueryFetch 훅 설계
- useFetch를 사용하던 기존 페이지들 전부 리팩토링
  - 데이터 구조, 에러 타입 변경되는 것에 유의하여 리팩토링

### 2. React Query 사용하기 : POST

- OrderPage와 `api/orders.ts`을 ReactQuery를 사용하도록 수정

---

### 리팩토링

- API 호출을 사용하는 위치에서 직접 선언해서 사용하는 구조 개선
  - axios로 공통 baseURL을 가진 instance를 정의해두고, 각 API는 api/ 디렉토리 내에서 기능 단위로 나눠 관리
