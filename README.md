# 💻 리퍼연구소(Refurlab) 

![Group 427322276](https://github.com/kangbyeonggguk/refurlab_AI-laptop/assets/152140608/659d6e39-8b82-4c0e-9fce-3710f5f6afa3)
- 2023.09.25~2023.12.29
- URL : https://refurlab.site
- Test ID : test
- Test PW : testPASSWORD
  <br>
  <br>
  <br>
## 프로젝트 소개
- 리퍼연구소는 중고 노트북을 판매할 때 전문가의 판단 전에 AI를 통해 파손도에 따라 등급 판정을 받아볼 수 있는 서비스를 제공합니다. 
- 노트북의 부위 별 사진을 업로드 해 각 부위 별 파손도와 노트북의 전체 등급을 판정 받고 판매 여부를 결정할 수 있습니다.
- 수리 후 판매하는 노트북의 판매 정보도 확인할 수 있습니다.
  <br>
  <br>
  <br>
## 기술 스택
  <div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white">
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white">
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=Nginx&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
  <img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
  <img src="https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">
  <img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
  <img src="https://img.shields.io/badge/googlecolab-F9AB00?style=for-the-badge&logo=googlecolab&logoColor=white">
  <img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">
  </div>
  <br>
  <br>
  
## 역할 분담
### 강병국(FE, BE)
- **UI**
  - 페이지 : 구매하기, 노트북 등급 확인, 내 정보 수정, 관리자 페이지, 등급제 설명
- **기능 및 컴포넌트**
  - 네비게이션 바, 모달창을 이용한 노트북 정렬, 페이지네이션, 검색
- **컨트롤러 및 API** 
  - 관리자 컨트롤러, 소셜 로그인, 문자 인증, 등급 측정한 노트북 정보 불러오기

### 김홍래(FE)
- **UI**
  - 페이지 : 홈, 로그인, 회원가입, 매입신청서 작성 페이지
- **기능 및 컴포넌트**
  - 로그인 유지와 그에 따른 화면 변화

### 음정애(FE)
  - **UI**
    - 페이지 : AI 측정 로딩, AI 등급 측정 결과, 전문가 등급 측정 신청, 관리자 페이지
  - **기능 및 컴포넌트**
    - 로딩 애니메이션

### 박찬익(BE)
  - **컨트롤러 및 API**
    - 노트북 판매 정보 불러오기

### 이수민(BE)
  - **컨트롤러 및 API**
    - 회원가입, 로그인, 로그아웃, 토큰 재발급, AI 등급 측정, 전문가 등급 측정 신청
  <br>
  <br>

## 페이지별 기능
### [홈 화면]
- 사이트 접속 시 초기 화면으로 네비게이션 바, 사이트 안내문구와 등급 측정 신청 페이지로 이동되는 버튼이 있습니다.
  - 로그인이 되어 있는 경우에는 다른 페이지로 이동이 가능하지만 아닌 경우에는 로그인 페이지로 이동되게 됩니다.
    
![home](https://github.com/kangbyeonggguk/refurlab_AI-laptop/assets/152140608/7616ea78-082a-4de6-987e-89f636a8126d)
<br>
### [회원가입]
- 회원가입에 필요한 정보를 입력하면 유효성 검사를 진행하고 맞지 않는 경우 입력창 하단에 경고문이 표시됩니다.
- 아이디 형식이 유효하지 않거나 서버의 중복확인 요청을 통과하지 못한 경우, 그 외 입력창의 유효성 검사 결과가 통과하지 못 했을 때 경고 문구가 표시됩니다.
- 모든 유효성 검사가 통과된 경우 회원가입하기 버튼을 클릭해 회원가입을 진행합니다.

![회원가입](https://github.com/kangbyeonggguk/refurlab_AI-laptop/assets/152140608/821df2a0-464b-409a-a603-35352f87fc8f)
<br>
### [로그인]
- 아이디와 비밀번호를 입력하면 유효성 검사를 진행하고 맞지 않는 경우 입력창 하단에 경고문이 표시됩니다.
- 모든 유효성 검사가 통과된 경우 로그인하기 버튼을 클릭해 로그인을 진행하고 홈 화면으로 이동합니다.
  
![recording-ezgif com-video-to-gif-converter (2)](https://github.com/kangbyeonggguk/refurlab_AI-laptop/assets/152140608/e8068efd-243a-42d2-9b59-ae5a20b1eb08)
<br>
 ### [로그아웃]
- 네비게이션 바의 로그아웃 버튼을 클릭해 로그아웃을 진행하고 로컬 스토리지의 토큰과 유저 정보를 삭제합니다.

![logout](https://github.com/kangbyeonggguk/refurlab_AI-laptop/assets/152140608/f61573e1-8b19-4258-80c2-ef39aef9fb20)
<br>

