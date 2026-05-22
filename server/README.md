# COZY — 백엔드 (server)

커피 주문 앱의 Express API 서버입니다. 프론트엔드는 상위 `ui/` 폴더에서 별도로 실행합니다.

## 기술 스택

- Node.js
- Express 5
- PostgreSQL (추후 연동, PRD 5장 참고)

## 사전 요구 사항

- Node.js 18 이상
- npm

## 설치

```bash
cd server
npm install
cp .env.example .env
```

`.env`에서 `PORT`, `CORS_ORIGIN`, `DATABASE_URL` 등을 필요에 맞게 수정합니다.

### PostgreSQL 연결

1. `.env`의 `DATABASE_URL`에 설치 시 만든 **사용자명·비밀번호**를 넣습니다.

   ```
   postgresql://postgres:비밀번호@localhost:5432/order_app
   ```

2. DB·테이블·초기 데이터 생성:

   ```bash
   npm run db:init
   ```

3. 서버 실행 후 `GET /api/health`에서 `database: "connected"` 확인

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | nodemon으로 개발 서버 실행 (기본 http://localhost:3000) |
| `npm start` | 프로덕션 모드 실행 |
| `npm run db:init` | DB 생성, 스키마·시드 데이터 적용 |

## API prefix

모든 API는 `/api` 아래에 둡니다.

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/health` | 서버·DB 연결 상태 확인 |

## 폴더 구조

```
server/
├── src/
│   ├── index.js       # 진입점
│   ├── app.js         # Express 앱 설정
│   ├── config/        # 환경 변수
│   └── routes/        # 라우트
├── .env.example
└── package.json
```

## 프론트엔드 연동

- 프론트 개발 서버: `ui` → `npm run dev` (기본 http://localhost:5173)
- 백엔드 CORS 기본값: `http://localhost:5173`

## 관련 문서

- 요구사항: `../docs/PRD.md` (5. 백엔드 요구사항)
