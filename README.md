# makehabit_BE

작심삼일을 습관으로
<br>
<br>

# 서비스 설명

[메인 ReadMe.md](https://github.com/Sinclebear/makehabit_BE.git) 를 먼저 참고 해주세요<br>
[서비스 소개 영상](https://makehabit.co.kr/)

<br>

# 팀원 소개

|   이름   |                           깃허브 주소                            | 포지션 |
| :------: | :--------------------------------------------------------------: | :----: |
| 진상혁🔰 |  [https://github.com/Sinclebear](https://github.com/Sinclebear)  | 백엔드 |
|  유주현  |    [https://github.com/bgg01555](https://github.com/bgg01555)    | 백엔드 |
|  김지섭  | [https://github.com/rednada1708](https://github.com/rednada1708) | 백엔드 |

<br>

# 기술 스택

|  이름   |       설명       |
| :-----: | :--------------: |
| AWS EC2 |  서버 인스턴스   |
| Node.js |   JS 실행 환경   |
| Express | nodeJS Framework |
| MongoDB |  데이터 베이스   |
|   git   |    버전 관리     |

<br><br>

# 라이브러리

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
<details>
<summary>서비스 아키텍쳐</summary>
<div markdown="1">

![뽀모모아키텍쳐v2](https://user-images.githubusercontent.com/85975904/151278794-c81d778e-31d5-4b89-af24-7a44b4b322d2.png)

</div>
</details>
</h1>

<br>

<h1>
<details>
<summary>API 명세서</summary>
<div markdown="1">

![auth](https://user-images.githubusercontent.com/87928719/151182062-10082d50-771c-4835-992a-be3f1c5d034e.PNG)
![users](https://user-images.githubusercontent.com/87928719/151182046-13c8f50a-da55-4e85-b68f-e0ee2ed242d6.png)
![studyRoom](https://user-images.githubusercontent.com/87928719/151182076-8896433d-2e7e-45e1-9c45-24e4ca46761d.png)
![post](https://user-images.githubusercontent.com/87928719/151182093-e3c120e9-cc38-4eb6-a706-4068b04534fb.png)

</div>
</details>
</h1>

<br>

# 트러블 슈팅, 느낀점

## 상혁

-

## 주현

-

## 지섭

-

<details>
<summary>프로젝트 회고</summary>
<div markdown="1">

- 6주라는 꽤 긴 기간이 주어지다보니 프로젝트의 규모를 키우고 싶었다.

- 프로젝트 규모가 커지는 만큼 서비스 기획, API 명세, 서비스 아키텍쳐 등등 준비 과정이 굉장히 길었다. 코드를 작성하기 전에 이미 기력을 모두 소모한 것같은 느낌을 받을 정도 였다.

- 문제는 긴 회의로 인해 지치다보니 한 번 작성해놓은 문서는 잘 수정되지 않았던 것이다. 아무리 꼼꼼하게 설계를 했어도 수정사항이 생기기 마련인데 소통의 부재가 발생한 것이다. 그렇게 Fe와 Be가 문서로만 소통하다보니 중간 결과물을 확인했을 때 수정사항이 몰아치면서 악순환이 계속 되었다.

- 이를 해결하기 위해 우리 조는 서로의 실수를 줄이고 전체적인 프로젝트를 이해하기 위한 방법이 없을까 찾아보던 중에 애자일 방법론의 데일리 스크럼 방식을 발견하게 되었는데

- 불확실성이 높은 서비스를 개발하거나 업데이트와 조율을 귀찮아 할 경우 도입하면 효과적이라는 것을 보고 한 번 시작해 보기로 했다.

- 매일 오전 10시에 15분 정도의 공통 회의 시간을 갖고 서로 작업 상황을 공유하며 오늘 할 작업과 수정 사항을 매일매일 공유하는 방식으로 규칙을 정했다. 아침에 일어나는 것이 굉장히 힘들었지만 모든 팀원이 참가해서 회의를 하고 대화를 나눴다.
  즉각적인 피드백으로 빠르게 서비스의 방향을 학습할 수 있었고 무의식적으로 서로 협동심도 생기는 것 같았다.

- 아직 유지/보수 및 추가할 기능들이 남아 있지만 MVP 서비스로의 런칭은 선공적으로 마무리 되었다.

- 이 프로젝트를 런칭하고 느낀점은 사람은 결국 말을 통해 소통하고 의사결정을 하고 서로의 의견을 묻기 때문에 짧지만 잦은 대화가 일의 효율성을 높여준다는 것이다.

</div>
</details>

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
