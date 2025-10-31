# 프로젝트 요약 - 초등 교과 평가계획 분석기

## 📋 프로젝트 개요

2022 개정 교육과정 성취기준을 기반으로 초등학교 교과 평가계획 문서를 자동으로 분석하고 검증하는 웹 애플리케이션입니다.

## ✅ 구현 완료 사항

### 1. 페이지 구조
- ✅ `/` - 홈 페이지 (로그인 페이지로 리다이렉트)
- ✅ `/login` - Google OAuth 로그인 페이지
- ✅ `/dashboard` - 메인 대시보드 (모든 기능 통합)

### 2. 주요 기능 UI
- ✅ 로그아웃 버튼
- ✅ 사용자 환영 메시지
- ✅ Gemini API 키 입력/테스트/저장
- ✅ Gemini 모델 선택 (2.0 Flash / 2.5 Flash)
- ✅ 파일 업로드 (docx, pdf, hwp)
- ✅ 분석하기 버튼
- ✅ 분석 결과 표시

### 3. UI 컴포넌트
- ✅ Button
- ✅ Card
- ✅ Input
- ✅ Textarea
- ✅ Badge
- ✅ Label
- ✅ Select

### 4. 데이터 구조
- ✅ TypeScript 타입 정의 (`types/index.ts`)
- ✅ 성취기준 데이터 (`data/achievements.json`)

### 5. 문서화
- ✅ README.md
- ✅ SETUP_GUIDE.md
- ✅ .env.local.example

## 🚧 추가 구현 필요 사항

### 1. 인증 (NextAuth.js)
- [ ] NextAuth.js 설정 파일 생성
- [ ] Google Provider 완전 연동
- [ ] 세션 관리

### 2. API 라우트
- [ ] `/api/auth/[...nextauth]/route.ts` - NextAuth 핸들러
- [ ] `/api/gemini/test` - API 키 테스트
- [ ] `/api/gemini/save` - API 키 저장 (암호화)
- [ ] `/api/file/upload` - 파일 업로드
- [ ] `/api/file/parse` - 파일 파싱 (docx, pdf, hwp)
- [ ] `/api/analyze` - Gemini로 분석

### 3. 파일 처리
- [ ] mammoth (docx 파싱)
- [ ] pdf-parse (pdf 파싱)
- [ ] node-hwp (hwp 파싱)

### 4. AI 분석 로직
- [ ] Gemini API 통합
- [ ] 프롬프트 엔지니어링
- [ ] 성취기준 매칭 알고리즘
- [ ] 평가기준 4단계 검증

### 5. 데이터베이스
- [ ] 사용자 데이터 저장
- [ ] API 키 암호화 저장
- [ ] 분석 히스토리

## 📁 프로젝트 구조

\`\`\`
IBschoolhome_test/
├── app/
│   ├── page.tsx                    # 홈 (리다이렉트)
│   ├── login/
│   │   └── page.tsx               # 로그인 페이지
│   ├── dashboard/
│   │   └── page.tsx               # 메인 대시보드
│   ├── layout.tsx                 # 루트 레이아웃
│   └── globals.css
├── components/
│   └── ui/                        # Radix UI 컴포넌트
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── badge.tsx
│       └── textarea.tsx
├── types/
│   └── index.ts                   # TypeScript 타입 정의
├── data/
│   └── achievements.json          # 2022 성취기준 데이터
├── .env.local.example             # 환경 변수 예시
├── README.md
├── SETUP_GUIDE.md
└── PROJECT_SUMMARY.md
\`\`\`

## 🎨 디자인 시스템

- **색상**: Tailwind CSS 기본 팔레트
- **그래디언트**: blue-50 → indigo-50
- **아이콘**: Lucide React
- **폰트**: Inter (sans-serif), Playfair Display (serif)

## 🔧 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: Radix UI
- **Icons**: Lucide React

### Backend (예정)
- **API**: Next.js API Routes
- **Auth**: NextAuth.js
- **AI**: Google Gemini API
- **File Processing**: mammoth, pdf-parse, node-hwp

### DevOps
- **Deployment**: Vercel
- **Version Control**: Git

## 📝 사용 시나리오

1. **교사가 로그인**
   - Google 계정으로 간편 로그인

2. **API 키 설정**
   - Gemini API 키 입력 및 저장
   - 모델 선택 (빠른 속도 vs 향상된 성능)

3. **파일 업로드**
   - 평가계획 문서 업로드 (docx/pdf/hwp)

4. **자동 분석**
   - AI가 2022 개정 교육과정 기준으로 분석
   - 오류 및 개선사항 자동 검출

5. **결과 확인**
   - 교과, 성취기준, 단원명, 평가기준 검증 결과
   - 오류 항목별 상세 설명 및 개선 제안

## 🚀 다음 단계

### Phase 1: 인증 (1-2일)
- NextAuth.js Google OAuth 완전 연동
- 세션 관리 및 보호된 라우트

### Phase 2: 파일 처리 (2-3일)
- 파일 업로드 API
- docx, pdf, hwp 파싱 구현
- 텍스트 추출 및 구조화

### Phase 3: AI 분석 (3-4일)
- Gemini API 통합
- 성취기준 데이터 확장
- 분석 알고리즘 구현
- 평가기준 검증 로직

### Phase 4: 데이터베이스 (2-3일)
- Vercel Postgres 또는 Supabase 연동
- 사용자 데이터 저장
- 분석 히스토리 기능

### Phase 5: 개선 (1-2일)
- UI/UX 개선
- 결과 다운로드 기능
- 일괄 분석 기능

## 💡 참고사항

- 현재 UI와 기본 구조는 완성
- 백엔드 로직 구현이 필요
- npm 패키지 설치 시 `--legacy-peer-deps` 플래그 사용
- 개발 서버: `npm run dev`
- 포트: http://localhost:3000

## 📞 문의

프로젝트 관련 문의나 이슈는 GitHub Issues를 통해 남겨주세요.
