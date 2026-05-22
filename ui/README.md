# COZY — 프론트엔드 (ui)

총기·탄약 주문 앱의 React 프론트엔드입니다. [Vite](https://vite.dev/) + React + JavaScript(바닐라 JS, TypeScript 미사용)로 구성되어 있습니다.

## 기술 스택

- React 19
- Vite 8
- ESLint

## 사전 요구 사항

- Node.js 18 이상
- npm

## 설치

```bash
cd ui
npm install
```

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | 개발 서버 실행 (기본 http://localhost:5173) |
| `npm run build` | 프로덕션 빌드 (`dist/`) |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 검사 |

## 폴더 구조

```
ui/
├── public/          # 정적 파일
├── src/
│   ├── main.jsx     # 앱 진입점
│   ├── App.jsx      # 루트 컴포넌트
│   ├── App.css
│   └── index.css    # 전역 스타일
├── index.html
└── vite.config.js
```

## 관련 문서

- 요구사항: `../docs/PRD.md`
