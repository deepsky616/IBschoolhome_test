# 설치 및 설정 가이드

## Google OAuth 설정

### 1. Google Cloud Console에서 프로젝트 생성

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성
3. "API 및 서비스" → "OAuth 동의 화면" 선택
4. 외부 사용자 유형 선택 후 필수 정보 입력

### 2. OAuth 2.0 클라이언트 ID 생성

1. "API 및 서비스" → "사용자 인증 정보"
2. "+ 사용자 인증 정보 만들기" → "OAuth 클라이언트 ID"
3. 애플리케이션 유형: "웹 애플리케이션"
4. 승인된 리디렉션 URI에 추가:
   - `http://localhost:3000/api/auth/callback/google`
   - (배포 후) `https://your-domain.com/api/auth/callback/google`
5. 생성된 클라이언트 ID와 클라이언트 보안 비밀번호 복사

### 3. 환경 변수 설정

`.env.local` 파일에 복사한 값 입력:

\`\`\`env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)
ENCRYPTION_KEY=$(openssl rand -hex 16)
\`\`\`

## Gemini API 키 발급

### 1. Google AI Studio 접속

1. [Google AI Studio](https://makersuite.google.com/app/apikey)에 접속
2. "Get API key" 클릭
3. API 키 생성 및 복사

### 2. 웹앱에서 API 키 등록

1. 로그인 후 대시보드에서 "Gemini API 키 설정" 섹션으로 이동
2. 발급받은 API 키 입력
3. "테스트" 버튼으로 유효성 확인
4. "저장" 버튼으로 저장

## 개발 환경 설정

### 필수 요구사항

- Node.js 18 이상
- npm 또는 pnpm

### 설치 단계

\`\`\`bash
# 1. 저장소 클론
git clone <repository-url>
cd IBschoolhome_test

# 2. 의존성 설치
npm install --legacy-peer-deps

# 3. 환경 변수 설정
cp .env.local.example .env.local
# .env.local 파일 편집

# 4. 개발 서버 실행
npm run dev
\`\`\`

### 빌드 및 배포

\`\`\`bash
# 프로덕션 빌드
npm run build

# 빌드 결과 실행
npm start
\`\`\`

## Vercel 배포

### 1. Vercel 프로젝트 생성

\`\`\`bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
\`\`\`

### 2. 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수 추가:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_URL` (배포된 도메인)
- `NEXTAUTH_SECRET`
- `ENCRYPTION_KEY`

## 문제 해결

### 의존성 충돌

\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### NextAuth 오류

- `NEXTAUTH_URL`이 현재 도메인과 일치하는지 확인
- `NEXTAUTH_SECRET`이 설정되어 있는지 확인

### Google OAuth 오류

- 리디렉션 URI가 Google Cloud Console에 등록되어 있는지 확인
- 클라이언트 ID와 Secret이 올바른지 확인

## 추가 도움말

문제가 지속되면 GitHub Issues에 문의해주세요.
