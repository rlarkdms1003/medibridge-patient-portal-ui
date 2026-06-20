# MediBridge Patient Portal

**MediBridge 재활정형외과** 재진 환자를 위한 웹 포털 UI입니다.  
예약·진료 안내·증명서 발급 안내·마이페이지 등 병원 이용에 필요한 정보와 기능을 한곳에서 제공합니다.

> 디자인 시스템 상세 가이드는 [docs/DESIGN.md](./docs/DESIGN.md)를 참고하세요.

---

## 주요 기능

### 진료 예약
- **인터넷 진료예약** — 의료진·일정·시간 선택 후 예약 확정
- **예약 확인/취소** — 예정·완료·취소 내역 조회 및 취소
- **마이페이지** — 다가오는 예약 요약, 예약 완료 시 자동 반영

### 이용 안내
- 외래·입원·퇴원·입원생활·문병·오시는 길
- 의료진 소개, 공지사항, FAQ
- 원내/외부 편의시설, 비급여 진료비용

### 신청·발급 안내
- 진단서·진료비 계산서·의무기록 사본 발급 절차 및 구비 서류 안내

### 로그인·마이페이지
- **재진 환자 로그인** — 휴대전화번호 인증 + 생년월일로 로그인 (아이디·비밀번호 없음)
- **마이페이지** — 예약 현황, 진료 이력, 회원정보 조회

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | React 19 |
| Language | TypeScript |
| Build | Vite 6 |
| Routing | React Router 7 |
| Styling | Tailwind CSS 3 |
| Font | Noto Sans KR, Material Symbols |

백엔드 API 없이 **프론트엔드 단독**으로 동작하며, 예약·로그인 데이터는 `localStorage`와 mock 데이터(`src/data/`)를 사용합니다.

---

## 시작하기

### 요구 사항
- Node.js 18+
- npm

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 프로젝트 구조

```
src/
├── App.tsx              # 라우팅
├── components/          # Header, Footer, 공통 UI
├── pages/               # 페이지 컴포넌트
├── contexts/            # Auth, Reservations 상태
├── data/                # mock 데이터
└── index.css            # 전역 스타일

docs/
└── DESIGN.md            # Stitch 디자인 시스템 가이드
```

---

## 디자인

**Medical Trust & Accessibility** 테마를 기반으로, 고령 환자와 시각 장애 사용자도 이용하기 쉽도록 대비·가독성·터치 영역을 고려했습니다.

- Primary: `#00236f` / Container: `#1e3a8a`
- 8px 그리드, 컨테이너 최대 1320px
- 색상·타이포 토큰: `tailwind.config.js`

---

## 주요 라우트

| 경로 | 설명 |
|------|------|
| `/` | 홈 |
| `/reservation` | 인터넷 진료예약 |
| `/reservation/confirm` | 예약 확인/취소 |
| `/mypage` | 마이페이지 |
| `/doctors` | 의료진 소개 |
| `/notices` | 공지사항 |
| `/faq` | FAQ |
| `/directions` | 오시는 길 |
| `/documents/*` | 발급 안내 |
| `/login` | 재진 환자 로그인 (휴대전화 인증 + 생년월일) |
