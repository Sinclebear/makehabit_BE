
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

# 📌 트러블 슈팅



<details>
<summary> 1. 이미지 리사이징  </summary> 
<div markdown="1">       

- **도입이유:** 사용자 경험 향상
- **문제상황:**
  각 리스트 페이지에서 원본 이미지를 썸네일로 사용하다보니 로딩 시간이 지연됨.
  로딩속도 향상을 위해 썸네일용의 리사이징된 작은 이미지가 필요했음.
- **고려한 기술: (일단 백엔드 쪽)**

  1. Node.js 모듈(gm vs sharp) :

  sharp가 속도나 메모리 면에서 우세한 성능을 보여 일반적으로 sharp 라이브러리를 사용하기로 함.

  2. AWS Lambda:

  Lambda는 서버를 프로비저닝하거나 관리하지 않고도 코드를 실행할 수 있게 해주는 컴퓨팅 서비스

- **해결 과정:**
  1. 이미지 리사이징 하는 위치에 대한 고민
  1) 서버에서 직접 sharp를 이용해 이미지 리사이징 후 저장되도록 구성
  2) s3에 트리거를 걸어 이미지 업로드시 lambda를 호출함으로써 리사이징 이미지 함께 저장되도록 구성
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
  1 ) 하나의 ec2에서 모든 유저의 요청을 받다 보니 유저가 몰릴 경우 부담이 갈 것이라 생각했음 2. 이런 상황에서 서비스를 운영한다면 유저가 더 몰릴 경우에 문제가 될 수 있겠다고 생각하였고 artillery 모듈을 사용해서 실제로 부하테스트를 해보았더니 서버가 금방 다운 되어버리는 현상이 발생함.

  3. 따라서 실제 서비스 런칭 전, 유저가 몰리는 상황에서도 서버를 안전하게 운영할 수 있도록 개선할 필요성을 느낌

- **고려한 기술 :**

  - NGINX : 웹 서버 소프트웨어. 장애대응, **로드 밸런싱**, Keep Alive 제어, Sub-Domain, 캐싱 처리 등 다양한 기능을 가지고 있음.
    ※ 로그 관련 [https://www.vompressor.com/nginx-log/](https://www.vompressor.com/nginx-log/)
  - Amazon ELB: 아마존에서 제공하는 로드밸런서. 이 시스템은 자동으로 **로드 밸런싱**을 제공하며 시스템이 서버가 죽지 않도록 알아서 관리
    NGINX는 별도로 인스턴스를 구성할 필요가 없고 무료라는 장점이 있었으나 인스턴스 내에서 동작하기 때문에 cpu 리소스를 추가로 소모한다는 단점이 있음.
    우리는 비용이 조금 더 들더라도 cpu 리소스를 아끼고 싶었고 Amazon ELB 외에도 aws에서 제공하는 고가용성과 관련된 여러 서비스들을 활용해보고 싶어서 로드밸런서로 Amzon ELB를 선택함.
    **※ 고가용성과 관련된 AWS 서비스**

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

  2.  Github Actions

- **해결 과정:**
  - Jenkins를 사용하기 위해 별도의 EC2 서버 설치가 필요
  - // Jenkins는 호환성 문제(어디와의 호환성 문제? Node.js? EC2? )로 Docker 환경에서 실행하는 것이 좋음
  - 우리 프로젝트의 규모가 크기 않기 때문에 Jenkins사용을 위해 모든 설정을 일일히 해주는것은 자원 낭비라고 생각했음
  - 반면 Github Actions는 별다른 설치 및 복잡한 절차 없이 사용 가능
  - 짧은 프로젝트 기간에 빠르게 적용해볼 수 있는 기술이기에 채택

</div>
</details>




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
