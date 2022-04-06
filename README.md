
# 습관삼끼

<span align="center" style="width=50%; height=200px">
  <img width="50%" alt="스크린샷 2021-12-09 오후 2 32 42" src="https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/810a5961-1b65-49ac-a1de-b99238ef7700/public">
</span>

## 작심삼일을 습관으로


<br>

# 🤷 서비스 설명


<p>
자신만의 캐릭터와 함께하는 30일간의 즐거운 습관 만들기
</p>

### :arrow_down: Click!
[![5조 습관삼끼 웹사이트](https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/8f82a931-3b08-4455-7303-3d12cdba3d00/public)](https://makehabit.co.kr) 
</br>

<br><br>



[메인 ReadMe.md](https://github.com/Sinclebear/makehabit_BE.git) 를 먼저 참고 해주세요<br>
[서비스 홈페이지](https://makehabit.co.kr/)

<br>

# 🧑🏼 개발기간 및 팀원소개
## 기간: 2022.02.25 ~ 2022.03.22



|   이름   |                           깃허브 주소                            | 포지션 |
| :------: | :--------------------------------------------------------------: | :----: |
| 진상혁🔰 |  [https://github.com/Sinclebear](https://github.com/Sinclebear)  | 백엔드 |
|  유주현  |    [https://github.com/bgg01555](https://github.com/bgg01555)    | 백엔드 |
|  김지섭  | [https://github.com/rednada1708](https://github.com/rednada1708) | 백엔드 |

<br>
<br>

# 🔨 기술 스택

|  이름   |       설명       |
| :-----: | :--------------: |
| AWS EC2 |  서버 인스턴스   |
| Node.js |   JS 실행 환경   |
| Express | nodeJS Framework |
| MongoDB |  데이터 베이스   |
|   git   |    버전 관리     |

<br><br>

#  📒 라이브러리

|           name            |            Appliance             | version  |
| :-----------------------: | :------------------------------: | :------: |
|          aws-sdk          |           aws 자격증명           | 2.1086.0 |
|          bcrypt           |         비밀번호 해쉬화          |  5.0.1   |
|           cors            |          cors 정책 설정          |  2.8.5   |
|          dotenv           |          환경 변수 관리          |  16.0.0  |
|          express          |          웹 프레임 워크          |  4.17.3  |
|            joi            |      비밀번호, 닉네임 검증       |  17.6.0  |
|       jsonwebtoken        | Json 포맷으로 사용자 속성을 저장 |  8.5.1   |
|          moment           |       날짜 관련 라이브러리       |  2.29.1  |
|         mongoose          |         데이터베이스 ORM         |  6.2.4   |
|          morgan           |            로그 관리             |  1.10.0  |
|          multer           |          이미지 업로드           |  1.4.4   |
|         multer-s3         |        이미지 업로드 (S3)        |  2.10.0  |
|         passport          |              로그인              |  0.5.2   |
|      passport-kakao       |          카카오 로그인           |  1.0.1   |
|            s3             |              aws S3              |  4.4.0   |
|       sanitize-html       |             XSS방어              |  2.7.0   |
|          winston          |            로그 관리             |  3.6.0   |
| winston-daily-rotate-file |          로그 파일 관리          |  4.6.1   |
|     winston-telegram      |        로그 텔레그램 전송        |  2.5.0   |

<br>

<h1>
:wrench:서비스 아키텍쳐
<div markdown="1">
<br>
  
![습관삼끼아키텍쳐v2](https://makehabit.s3.ap-northeast-2.amazonaws.com/origin/721649252008638.PNG)

</div>
</details>
</h1>

<br>

<h1>

:closed_book: API 명세서
<div markdown="1">
<br>

[API 명세서 노션 페이지](https://witty-board-2e4.notion.site/API-8502ee36812b49cbbe18f072cb8a70c2)

</div>
</h1>

<br>

# 📌 트러블 슈팅, 느낀점

## 상혁

-

## 주현

-

## 지섭

-

<br>
<br>

# 설치 가이드

아래 지시사항을 통해 프로젝트를 실행하실 수 있습니다.

## 필수 구성 요소

- Node.js
- MongoDB

## 설치

1. 프로젝트 클론

```console
$ git clone https://github.com/Sinclebear/makehabit_BE.git
```

2. 패키지 설치

```console
$ cd server
$ npm install
```

3. 환경 변수 설정

```text
// backend 폴더 안에 .env 파일 생성 후 아래 내용 기입

AWS_MONGO_DB = 몽고DB 주소 및 비밀번호
JWT_SECRET_KEY = JWT 시크릿키


// S3와 oauth 옵션, 로컬로 구동 시 꼭 설정할 필요 x

S3_ACCESS_KEY = AWS S3 키ID
S3_SECRET_ACCESS_KEY = AWS S3 시크릿키
S3_BUCKET_REGION = AWS S3 리전
S3_BUCKET_NAME = AWS S3 버킷 이름

KAKAO_ID = kakao api 키
KAKAO_CALLBACK_URL= 카카오 콜백 URL

// 확률 관련 정보 COMMON < UNCOMMON < RARE < EPIC < 100

COMMON= COMMON일 확률
UNCOMMON= UNCOMMON일 확률
RARE = RARE일 확률
EPIC = EPIC일 확률

```

## Backend API 서버 실행

```console
$ cd server
$ node server.js
```
