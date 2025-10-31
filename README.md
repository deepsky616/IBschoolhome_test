# 초등 교과 평가계획 분석기

2022 개정 교육과정 성취기준을 기반으로 초등학교 교과 평가계획을 자동으로 분석하고 검증하는 웹 애플리케이션입니다.

## 주요 기능

- ✅ **Google OAuth 로그인**: 구글 계정으로 간편하게 로그인
- 🔑 **Gemini API 키 관리**: 개인 API 키 입력, 테스트, 안전한 저장
- 🤖 **AI 모델 선택**: Gemini 2.0 Flash / 2.5 Flash 중 선택
- 📁 **파일 업로드**: docx, pdf, hwp 형식 지원
- 🔍 **자동 분석**: 성취기준, 평가기준, 단원명 등 자동 검증
- 📊 **오류 점검**: 4단계 평가기준 (매우잘함/잘함/보통/노력요함) 검증

## 기술 스택

- **Framework**: Next.js 15, React 19, TypeScript
- **UI**: Radix UI, Tailwind CSS
- **AI**: Google Gemini API
- **Auth**: NextAuth.js (Google Provider)

## 시작하기

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 입력하세요:

\`\`\`env
# Google OAuth (Google Cloud Console에서 발급)
GOOGLE_CLIENT_ID=<your_client_id_here>
GOOGLE_CLIENT_SECRET=<your_client_secret_here>

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate_with_openssl_rand>

# Encryption (API 키 암호화용)
ENCRYPTION_KEY=<32_character_key_here>
\`\`\`

> **참고**: `.env.local.example` 파일을 참조하세요.

### 2. 의존성 설치

\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### 3. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 사용 방법

1. **로그인**: Google 계정으로 로그인
2. **API 키 설정**: Gemini API 키 입력 및 저장
3. **모델 선택**: 사용할 Gemini 모델 선택
4. **파일 업로드**: 평가계획 파일 (docx/pdf/hwp) 업로드
5. **분석 시작**: "분석하기" 버튼 클릭
6. **결과 확인**: 오류 및 개선 사항 확인

## 지원 파일 형식

- ✅ **DOCX**: Microsoft Word 문서
- ✅ **PDF**: PDF 문서
- ✅ **HWP**: 한글 문서 (표 분석 제외)

## 분석 항목

- 교과명
- 성취기준 코드 형식
- 단원명
- 평가 영역
- 평가 요소
- 평가기준 4단계 (매우잘함/잘함/보통/노력요함)

## 개발 로드맵

- [ ] NextAuth.js Google OAuth 완전 연동
- [ ] 파일 파싱 API 구현 (docx, pdf, hwp)
- [ ] Gemini API 분석 로직 구현
- [ ] 데이터베이스 연동 (분석 히스토리)
- [ ] 결과 다운로드 기능 (PDF, JSON)
- [ ] 일괄 분석 기능

## 라이선스

MIT

## 문의

이슈가 있으시면 GitHub Issues를 통해 문의해주세요.
