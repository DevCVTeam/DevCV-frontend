## DevCV_FE

<img src="https://github.com/DevCVTeam/DevCV-frontend/blob/main/public/logo.png?raw=true" />

_현업자의 이력서를 공유하며 취업에 도움을 주는 서비스입니다._

### User Flow

**User**

```mermaid
%% 이용자
flowchart LR


    Header[헤더]

    SignIn[로그인 페이지]
    SignUp[회원가입 페이지]
    IdFind[ID찾기 모달창]
    PasswordFind[ID찾기 모달창]

    AdminSignIn[관리자 로그인 모달창]

    Home[메인화면]
    ResumeList[이력서List]
    ResumeDetailView[이력서 상세페이지]
    ResumeDetailComment[이력서 상세 댓글]
    ResumeDetailCommentWrite[이력서 상세 댓글 작성]
    ResumeDetailProductInquiry[이력서 상세 문의]

    ResumeSale[이력서 구매 페이지]

    Profile[마이페이지]
    ProfileEdit[유저수정페이지]
    BuyResume[구매한 이력서]
    SaleResume[판매한 이력서]

    Authorize{인증 여부}

    EventList[이벤트 리스트페이지]
    EventDetail[이벤트 상세페이지]

    Home --- Header

    Home --> ResumeList --> ResumeDetailView
    ResumeDetailView --> ResumeDetailComment
    ResumeDetailComment --> ResumeDetailCommentWrite
    ResumeDetailView --> ResumeDetailProductInquiry
    ResumeDetailView --> ResumeSale

    Header -.-> Authorize -.-> |NO| Profil --> SignIn
    SignIn --> AdminSignIn
    SignIn --> SignUp
    SignIn --> IdFind
    SignIn --> PasswordFind
    SignIn --> IdFind


    Header -.-> Authorize -.-> |YES| Profile --> ProfileEdit
    Profile -->  BuyResume
    Profile --> SaleResume

    Header -.-> Authorize -.-> |YES| EventList --> EventDetail


```

### 기술스택

`Nextjs`, `TypeScript`, `Tailwindcss`, `Github Actions`, `aws`, `pnpm`

[![My Skills](https://skillicons.dev/icons?i=next,ts,tailwindcss,githubactions,aws,pnpm)](https://skillicons.dev)

---

### 프로젝트 정보

코로나 팬데믹때 IT붐으로 인해 개발자 수요가 증가하였지만 금리가 인상과 세계정세가 흔들리면서 시장에 현금유동성이 떨어지기 시작했습니다.

얼마 지나지 않아 개발자 시장은 수요는 줄고 공급이 늘어나버리는 사태가 일어나게 되었습니다. 저희는 이러한 개발자들이 선호하는 이력서, 기술 스택, 기업규모를 체크하고 그에 맞는 솔루션을 제공하고자 프로젝트를 기획, 개발하게 되었습니다.

기획 기간: **2024.05.20 ~ 2024.05.26**
개발 기간: **2024.05.27 ~ 2024.07.09**

---

### 트러블 슈팅

- 블로그에 올려서 링크 올리기

[next.JS nextjs parallel interception 트러블 슈팅](https://toris-dev.tistory.com/33)

---

### 배포주소

#### [DevCV](http://devcv.net)

---

### 팀 정보

- [Toris-dev](https://github.com/toris-dev) (ironjustlikethat@gmail.com)
- [Taehyeonn](https://github.com/Taehyeonn) (97taehyun@gmail.com)
- [luxihua](https://github.com/luxihua) (maseoyoung12@gmail.com)
- [pangyosim](https://github.com/pangyosim) (spg9687@gmail.com)

---

### [디자인](https://github.com/DevCVTeam/DevCV-frontend/wiki/Figma-%EB%94%94%EC%9E%90%EC%9D%B8)

<p float="left">
  <img src="https://raw.githubusercontent.com/DevCVTeam/.github/main/frontend/image/메인페이지.png" width="300" />
  <img src="https://raw.githubusercontent.com/DevCVTeam/.github/main/frontend/image/로그인.png" width="300" />
</p>

<p float="left">
   <img src="https://raw.githubusercontent.com/DevCVTeam/.github/main/frontend/image/판매등록페이지%20등록전.png" width="300" />
  <img src="https://raw.githubusercontent.com/DevCVTeam/.github/main/frontend/image/상세페이지_상품상세.png" width="300" />
</p>

<p float="left">
  <img src="https://raw.githubusercontent.com/DevCVTeam/.github/main/frontend/image/관리자페이지.png" width="300" />
  <img src="https://raw.githubusercontent.com/DevCVTeam/.github/main/frontend/image/관리자페이지%20이력서신청%20모달.png" width="300" />
   <img src="https://raw.githubusercontent.com/DevCVTeam/.github/main/frontend/image/마이페이지.png" width="300" />
</p>
