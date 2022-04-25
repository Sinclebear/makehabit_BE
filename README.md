
# 습관삼끼
<a href="https://makehabit.co.kr/"> <img alt="습관삼끼" src="https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/810a5961-1b65-49ac-a1de-b99238ef7700/public" width="500" height="250"> </a>

## 작심삼일을 습관으로


<br>

# 🤷 서비스 설명


<p>
자신만의 캐릭터와 함께하는 30일간의 즐거운 습관 만들기
</p>

<br>

## 📌 주요 기능

|                                                          <a href="https://makehabit.co.kr/login">🔗로그인/회원가입</a>                                                           |                                                       <a href="https://makehabit.co.kr/postwrite">🔗챌린지개설</a>                                                        |                                                       <a href="https://makehabit.co.kr/mychallenge/navi">🔗챌린지인증</a>                                                        |                                                          <a href="https://makehabit.co.kr/ranking">🔗랭킹페이지</a>                                                           |                                                          <a href="https://makehabit.co.kr/character">🔗캐릭터샵</a>                                                           |
| :-------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="320" alt="로그인/회원가입" src="https://user-images.githubusercontent.com/96245651/161957188-13758b80-91ec-4614-b1a3-a0a87abb4ded.gif"> | <img width="320" alt="개설" src="https://user-images.githubusercontent.com/96245651/161957249-97fdc881-096a-4477-8ad8-df02519df4e4.gif"> | <img width="320" alt="인증" src="https://user-images.githubusercontent.com/96245651/161957290-ef987088-6410-40bd-a98c-efb4daa3f4ec.gif"> | <img width="320" alt="랭킹페이지" src="https://user-images.githubusercontent.com/96245651/161957083-ac4710a9-2594-48d1-b78b-f17c46e5fdbc.gif"> | <img width="320" alt="캐릭터샵" src="https://user-images.githubusercontent.com/96245651/161951520-ea31b791-77b8-4b97-b273-6fcedf734669.gif"> |

<br>

# 🧑🏼 개발기간 및 팀원소개
## 기간: 2022.02.25. ~ 2022.04.07.



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
|          multer           |          이미지 업로드           |  1.4.4   |
|         multer-s3         |        이미지 업로드 (S3)        |  2.10.0  |
|         passport          |              로그인              |  0.5.2   |
|      passport-kakao       |          카카오 로그인           |  1.0.1   |
|            s3             |              aws S3              |  4.4.0   |
|       sanitize-html       |             XSS방어              |  2.7.0   |
| jest |          테스트코드 작성          |  27.5.1   |
|     prettier      |        코드 포맷팅        |  2.5.1   |
|     supertest      |        테스트코드 작성        |  6.2.2   |
<br>

<h1>
:wrench:서비스 아키텍쳐
<div markdown="1">
<br>
  
![습관삼끼아키텍쳐v2](https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/8266ed0b-a588-4053-6d95-d36952d68100/public)

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

# 🛠️ 트러블 슈팅




<details>
<summary> 1. 이미지 리사이징  </summary> 
<div markdown="1">       

- **도입이유:** 사용자 경험 향상
- **문제상황:**
  각 리스트 페이지에서 원본 이미지를 썸네일로 사용하다보니 로딩 시간이 지연됨.
  로딩속도 향상을 위해 썸네일용의 리사이징된 작은 이미지가 필요했음.
- **고려한 기술: (일단 백엔드 쪽)**

  1. Node.js 모듈(gm vs sharp) :
      - sharp가 속도나 메모리 면에서 우세한 성능을 보여 일반적으로 sharp 라이브러리를 사용하기로 함.

  2. AWS Lambda:
      - Lambda는 서버를 프로비저닝하거나 관리하지 않고도 코드를 실행할 수 있게 해주는 컴퓨팅 서비스

- **해결 과정:**
  1. 이미지 리사이징 하는 위치에 대한 고민
      - 서버에서 직접 sharp를 이용해 이미지 리사이징 후 저장되도록 구성
      - s3에 트리거를 걸어 이미지 업로드시 lambda를 호출함으로써 리사이징 이미지 함께 저장되도록 구성
      ⇒ 2안의 경우 별도의 ec2 자원을 사용하지 않아도 되므로 더 효율적일 것이라 생각해서 채택
  
  2. Lambda를 이용한 이미지 리사이징 작업
     - s3에 트리거를 걸어 origin 폴더에 이미지 업로드시 lambda를 호출
     - lambda가 호출되면 sharp이용해서 리사이징 이미지를 thumb폴더에 저장됨
  
  3. 백엔드서버에서는 replace함수를 활용하여 상황에 따라 원본이미지 또는 압축된 이미지를 프론트에 전송
      - 상세 페이지, 인증샷 페이지 열람 시에는 원본 이미지를,
      - 챌린지 목록 또는 작은 크기의 이미지로도 충분한 경우는 썸네일 이미지 사용.

</div>
</details>


<details>
<summary>2. BE 고가용성</summary>
<div markdown="1">      

- **도입이유 :** 서버의 안정적인 운영을 통해 사용자 경험 향상
- **문제상황 :**
  
  1. 하나의 ec2에서 모든 유저의 요청을 받다 보니 유저가 몰릴 경우 부담이 갈 것이라 생각했음 
  
  2. 이런 상황에서 서비스를 운영한다면 유저가 더 몰릴 경우에 문제가 될 수 있겠다고 생각하였고 artillery 모듈을 사용해서 실제로 부하테스트를 해보았더니 서버가 금방 다운 되어버리는 현상이 발생함.

  3. 따라서 실제 서비스 런칭 전, 유저가 몰리는 상황에서도 서버를 안전하게 운영할 수 있도록 개선할 필요성을 느낌

- **고려한 기술 :**
    1. NGINX : 
        - 웹 서버 소프트웨어. 장애대응, **로드 밸런싱**, Keep Alive 제어, Sub-Domain, 캐싱 처리 등 다양한 기능을 가지고 있음.
        - 로그 관련 [https://www.vompressor.com/nginx-log/](https://www.vompressor.com/nginx-log/)
  
    2. Amazon ELB: 
        - 아마존에서 제공하는 로드밸런서
        - 이 시스템은 자동으로 **로드 밸런싱**을 제공하며 시스템이 서버가 죽지 않도록 알아서 관리
        - NGINX는 별도로 인스턴스를 구성할 필요가 없고 무료라는 장점이 있었으나 인스턴스 내에서 동작하기 때문에 cpu 리소스를 추가로 소모한다는 단점이 있음.
        - 우리는 비용이 조금 더 들더라도 cpu 리소스를 아끼고 싶었고 Amazon ELB 외에도 aws에서 제공하는 고가용성과 관련된 여러 서비스들을 활용해보고 싶어서 로드밸런서로 Amzon ELB를 선택함.
  
 - **고가용성과 관련된 AWS 서비스**

    1. Amazon ELB : 네트워크 트래픽을 분산하여 애플리케이션 확장성 개선

    2. AWS Auto Scaling : 성능과 비용을 최적화하도록 애플리케이션 규모 조정

    3. Amazon Cloud Watch: AWS 및 온프레미스에서 AWS 리소스 및 애플리케이션의 관찰기능

- **해결 과정 :**

    1. 백엔드 서버와 데이터베이스 서버 분리함

    2. Amazon ELB를 활용하여 두 개의 ec2를 백엔드 서버로 사용하고 트래픽을 분산함

    3. Amazon Cloud Watch를 통해 현재 가동중인 ec2 상태를 상시 점검

    4. AWS Auto Scaling기능을 활용하여
     만약 ec2의 **평균 점유율이 40%를 넘어가면** 새로운 ec2를 생성하여 **세 대의 ec2로 백엔드 서버를 운영**하고, **다시 점유율이 떨어지면** 새로 켜진 ec2를 종료하여 **두 대의 ec2로 백엔드 서버를 운영**함.
</div>
</details>


<details>
<summary>3. 배포자동화</summary>
<div markdown="1">  
  
- **도입이유 :** 배포자동화를 통해 효율적인 작업 환경을 구축하기 위해서
- **문제상황 :**
  프론트엔드와 협업하기 위해 주기적으로 서버를 배포 해야 했음. 변경 사항이 발생함에 따라 배포에 계속해서 시간을 빼앗김
- **고려한 기술 :**

    1.  Jenkins
       - 거의 모든 언어의 조합과 소스코드 리포지토리(Repository)에 대한 지속적인 통합(CI)과 지속적인 배포(CD)를 무료로 제공해주는 툴

    2.  Github Actions
       - Github Actions은 Github 저장소를 기반으로 소프트웨어 개발 Workflow를 자동화 할 수 있는 툴

- **해결 과정:**
    1. Jenkins를 사용하기 위해 별도의 EC2 서버 설치가 필요
    2. 우리 프로젝트의 규모가 크기 않기 때문에 Jenkins사용을 위해 모든 설정을 일일히 해주는것은 자원 낭비라고 생각했음
    3. 반면 Github Actions는 별다른 설치 및 복잡한 절차 없이 사용 가능
    4. 짧은 프로젝트 기간에 빠르게 적용해볼 수 있는 기술이기에 채택

</div>
</details>

<br>
<br>

# 📝 Git Convention

<h4> ○&nbsp;&nbsp;main: 기준이 되는 브랜치로 바로 배포가 가능한 수준의 상태로 유지되는 브랜치 입니다. </h4>
<h4> ○&nbsp;&nbsp;develop : 개발 브랜치로 이 브랜치를 기준으로 각자 작업한 기능들을 합칩니다. </h4>
<h4> ○&nbsp;&nbsp;feature (mypage, challenge, ranking  ... )  : 단위 기능을 개발하는 브랜치로 기능 개발이 완료되면 develop 브랜치에 합칩니다. </h4>



```java
1. main 브랜치에서 시작 합니다.

2. 동일한 브랜치를 develop에도 생성을 합니다. 팀원들은 이 develop 브랜치에서 개발을 진행합니다.

3. 개발을 진행하다가 마이 페이지, 랭킹 등의 기능 구현이 필요할 경우 
   A팀원은 develop 브랜치에서 feature 브랜치를 하나 생성해서 마이 페이지 기능을 구현하고
   B팀원은 develop 브랜치에서 feature 브랜치를 하나 생성해서 랭킹 기능을 구현합니다.
   
4. 완료된 feature 브랜치는 검토를 거쳐 develop 브랜치에 Pull Request를 보냅니다.

5. feature 브랜치를 develop 브랜치로 합치기 전에 반드시 팀원들과 함께 수정 사항에 대한 코드를 리뷰 한 후 merge를 진행합니다. 

6. 추가로 기능 구현이 필요하거나 버그를 발견한 경우 issue에 해당 사안을 작성합니다.

7. 이슈에 남긴 내용은 해당 작업을 진행했던 개발자가 확인 후, 3 ~ 5 과정을 거쳐 close 시킵니다.

8. 이상이 없는 상태의 develop 브랜치는 주기적으로 main 브랜치로 합칩니다.
```

<img alt="습관삼끼" src="https://t1.daumcdn.net/cfile/tistory/99CD994C5E69CCF223" width="50%"> 

<br>
<br>

# 🚩 설치 가이드

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
