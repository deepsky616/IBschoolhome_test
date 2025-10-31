# 문제 해결 가이드

## 404 에러 - API 라우트를 찾을 수 없음

### 증상
- 파일 업로드 후 "Failed to load resource: the server responded with a status of 404" 에러
- 분석 결과가 빈 객체로 나타남

### 원인
1. 개발 서버가 재시작되지 않음
2. API 라우트 파일이 제대로 인식되지 않음
3. Next.js 빌드 캐시 문제

### 해결 방법

#### 1. 개발 서버 재시작
```bash
# 현재 실행 중인 서버 중지 (Ctrl+C)
# 그 다음:
npm run dev
```

#### 2. Next.js 캐시 삭제 후 재시작
```bash
# .next 폴더 삭제
rm -rf .next

# 재시작
npm run dev
```

#### 3. 전체 재설치
```bash
# node_modules 삭제
rm -rf node_modules

# 패키지 재설치
npm install --legacy-peer-deps

# 재시작
npm run dev
```

#### 4. API 라우트 수동 테스트
서버 실행 후 다른 터미널에서:
```bash
curl -X POST http://localhost:3000/api/analyze \
  -F "file=@sample-data.json"
```

정상 응답 예시:
```json
{
  "totalItems": 6,
  "validItems": 2,
  "items": [...]
}
```

## 분석 결과가 항상 0으로 나옴

### 확인 사항

1. **브라우저 콘솔 확인** (F12 → Console 탭)
   - 에러 메시지 확인
   - "Analysis result received" 로그 확인

2. **서버 터미널 확인**
   - "[Analyzer] Starting analysis" 로그 확인
   - 오류 개수 로그 확인

3. **파일 형식 확인**
   - JSON 형식: 올바른 구조인지 확인
   - 텍스트 형식: 키:값 형식인지 확인

### 디버깅 체크리스트

- [ ] 개발 서버 실행 중
- [ ] API 라우트 파일 존재 확인: `app/api/analyze/route.ts`
- [ ] analyzer.ts 파일 존재 확인: `lib/analyzer.ts`
- [ ] 샘플 데이터 파일 존재 확인: `sample-data.json`
- [ ] 브라우저 콘솔에서 에러 없음
- [ ] 서버 터미널에서 로그 출력됨

## 파일 업로드 안됨

### 확인 사항
1. 파일 크기 10MB 이하
2. 파일 확장자: .json, .txt, .docx, .pdf, .hwp
3. 파일이 손상되지 않았는지 확인

## 개발 서버 시작 안됨

### 에러: "npm run dev" 실패

```bash
# 포트 충돌 확인
lsof -ti:3000

# 다른 포트로 실행
PORT=3001 npm run dev
```

### 에러: "Module not found"

```bash
# 패키지 재설치
npm install --legacy-peer-deps
```

## 연락처

문제가 계속되면 GitHub Issues에 다음 정보와 함께 문의:
- 에러 메시지 (브라우저 콘솔 + 서버 터미널)
- Node.js 버전: `node --version`
- npm 버전: `npm --version`
- 운영체제 정보
