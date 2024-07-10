## DevCV_FE

<img src="https://github.com/DevCVTeam/DevCV-frontend/blob/main/public/logo.png?raw=true" />

_현업자의 이력서를 공유하며 취업에 도움을 주는 서비스입니다._

## UserFlow

**User**

```mermaid
%% 이용자
flowchart LR


    Header[헤더]

    SignIn[로그인 페이지]
    SignUp[회원가입 페이지]
    IdFind[ID찾기 모달창]
    PasswordFind[PWD찾기 모달창]

    AdminSignIn[관리자 로그인 모달창]

    Home[메인화면]
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

    Home  --> ResumeDetailView
    ResumeDetailView --> ResumeDetailComment
    ResumeDetailComment --> ResumeDetailCommentWrite
    ResumeDetailView --> ResumeDetailProductInquiry
    ResumeDetailView --> ResumeSale

    Header -.-> Authorize -.-> |NO| Profile --> SignIn
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

---

**admin**

```mermaid
flowchart LR


    Header[헤더]

    SignIn[로그인 페이지]
    AdminSignIn[관리자 로그인 모달창]

    Authorize{인증 여부}

    Home[메인화면]
    ResumeDetailPage[이력서 상세페이지]
    ResumeDetailView[이력서 상세페이지]
    ResumeDetailComment[이력서 상세 댓글]
    ResumeDetailProductInquiry[이력서 상세 문의]

    AdminPage[관리자 페이지]
    ResumePendingTable[관리자 이력서 승인 테이블]
    ResumePendingModal[관리자 이력서 승인 모달창]
    ResumeModified[관리자 이력서 수정 승인 모달창]
    ResumeModifiedModal[관리자 이력서 수정승인 모달창]
    EventTable[이벤트 테이블]
    CreateEventModal[이벤트 생성 모달창]


    Home --> ResumeDetailPage
    ResumeDetailPage --- ResumeDetailComment
    ResumeDetailPage --- ResumeDetailProductInquiry
    ResumeDetailPage --- ResumeDetailView

    Home --> SignIn --> AdminSignIn -.-> |YES| Authorize --> AdminPage
    Header --> Authorize -.->  |NO| Home
    AdminPage --> ResumePendingTable --> ResumePendingModal
    AdminPage --> ResumeModified --> ResumeModifiedModal
    AdminPage --> EventTable --> CreateEventModal



```

## 기술스택

`Nextjs`, `TypeScript`, `Tailwindcss`, `Github Actions`, `aws`, `pnpm`

[![My Skills](https://skillicons.dev/icons?i=next,ts,tailwindcss,githubactions,aws,pnpm)](https://skillicons.dev)

---

## 프로젝트 정보

코로나 팬데믹때 IT붐으로 인해 개발자 수요가 증가하였지만 금리가 인상과 세계정세가 흔들리면서 시장에 현금유동성이 떨어지기 시작했습니다.

얼마 지나지 않아 개발자 시장은 수요는 줄고 공급이 늘어나버리는 사태가 일어나게 되었습니다.
저희는 이러한 개발자들이 선호하는 이력서, 기술 스택, 기업규모를 체크하고 그에 맞는 솔루션을 제공하고자 프로젝트를 기획, 개발하게 되었습니다.

기획 기간: **2024.05.13 ~ 2024.05.26**

개발 기간: **2024.05.27 ~ 2024.07.09**

---

## [트러블 슈팅](https://github.com/DevCVTeam/DevCV-frontend/wiki/parallel-routes-interception-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85)

[next.JS nextjs parallel interception 트러블 슈팅](https://toris-dev.tistory.com/33)

---

## 배포 과정

main 브랜치에 PUSH, PR 하였을 경우 Github Action runner 실행.
runner 는 아래와 같은 순서로 동작.

1. `pnpm cache`, `install`, .env.production 주입
2. `pnpm install` (프로젝트 의존성 설치)
3. `pnpm build` (프로젝트 빌드)
4. Make tar file 압축
5. scp 로 클라우드 서버에 전송
6. ssh 서버 접속하여 쉘 스크립트 실행하여 docker-compose 컨테이너 빌드 후 백그라운드 실행

배포 주소 : [DevCV](http://devcv.net)

---

## 팀 정보

<div align="center">

|                               **[pangyosim](https://github.com/pangyosim) (spg9687@gmail.com)**                               |                              **[Taehyeonn](https://github.com/Taehyeonn) (97taehyun@gmail.com)**                              |                              **[luxihua](https://github.com/luxihua) (maseoyoung12@gmail.com)**                               |                          **[Toris-dev](https://github.com/toris-dev) (ironjustlikethat@gmail.com)**                           |
| :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/DevCVTeam/.github/assets/108069902/f6030531-0b1f-4cfa-b7b0-82488445c256" height=150 width=150 /> | <img src="https://github.com/DevCVTeam/.github/assets/108069902/041986a5-6be4-48c0-8f62-969187062cd2" height=150 width=150 /> | <img src="https://github.com/DevCVTeam/.github/assets/108069902/4a7d6087-b152-4b09-ab02-b8a0f02db29f" height=150 width=150 /> | <img src="https://github.com/DevCVTeam/.github/assets/108069902/2d5842e0-6a12-43d1-8ef6-e587af05b540" height=150 width=150 /> |

</div>

---

## [디자인](https://github.com/DevCVTeam/DevCV-frontend/wiki/Figma-%EB%94%94%EC%9E%90%EC%9D%B8)

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
