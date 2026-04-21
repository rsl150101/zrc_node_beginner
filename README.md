# 🚀 Node.js Beginner Projects (ZRC)

본 프로젝트는 Node.js 입문자를 위한 학습용 예제들을 모아놓은 저장소입니다. Express, Sequelize, Passport, Socket.io, AWS S3 등 다양한 기술 스택을 활용한 실습 프로젝트들이 포함되어 있습니다.

## 📂 프로젝트 구조

각 폴더는 특정 주제나 기능을 구현한 독립적인 프로젝트입니다.

| 폴더명 | 프로젝트 설명 | 주요 기술 스택 |
| :--- | :--- | :--- |
| `ch9_nodebird` | SNS 서비스 (NodeBird) 기본 구현 | Express, Sequelize, Passport, Nunjucks |
| `ch10_api_server` | API 제공 서버 구현 | JWT, Express, Sequelize |
| `ch10_call_server` | API 호출 서버 (Client) 구현 | Axios, Express |
| `ch12_ws` | WebSocket을 이용한 실시간 통신 | ws |
| `ch12_socketio` | Socket.io를 이용한 채팅 기본 | Socket.io, Express |
| `ch12_chatroom` | 다중 채팅방 기능을 갖춘 채팅 서비스 | Socket.io, MongoDB (Mongoose) |
| `ch13_auction` | 실시간 경매 시스템 | Socket.io, Sequelize, Scheduler |
| `ch15_nodebird_deploy` | NodeBird 서비스 배포용 설정 | PM2, Winston, Helmet, HPP |
| `ch16_aws_resize_image` | AWS Lambda를 이용한 이미지 리사이징 | AWS Lambda, AWS S3 |
| `ch16_nodebird_s3_lambda` | S3 업로드 및 Lambda 연동 NodeBird | AWS S3, Multer-S3 |

## 🛠 시작하기

### 1. 필수 소프트웨어
- Node.js (v16 이상 권장)
- MySQL / MongoDB (각 프로젝트 요구사항에 따라 다름)

### 2. 설치 및 실행
각 폴더로 이동하여 의존성을 설치한 후 실행합니다.

```bash
cd [폴더명]
npm install
npm start # 또는 npm run dev
```

---

## 📝 라이선스
이 프로젝트는 학습용으로 제작되었습니다.