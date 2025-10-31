# 🚨 404 에러 빠른 해결법

## 문제: "Failed to load resource: 404" 

API 라우트를 찾을 수 없다는 에러입니다.

## ✅ 해결 방법 (순서대로 시도)

### 1단계: 개발 서버 재시작 (가장 흔한 해결법)

```bash
# 터미널에서 Ctrl+C로 서버 중지

# 다시 시작
npm run dev
```

### 2단계: 캐시 삭제 후 재시작

```bash
# .next 폴더 삭제
rm -rf .next

# 서버 재시작
npm run dev
```

### 3단계: API 라우트 확인

브라우저에서 직접 접속:
```
http://localhost:3000/api/analyze
```

다음 메시지가 나오면 정상:
```json
{"error": "파일이 제공되지 않았습니다"}
```

### 4단계: 테스트

1. 브라우저 새로고침 (Ctrl+R 또는 Cmd+R)
2. `sample-data.json` 파일 업로드
3. "분석하기" 클릭

## 🎯 정상 작동 확인

### 브라우저 콘솔 (F12)에서 확인:
```
Analysis result received: {
  totalItems: 6,
  validItems: 2,
  itemsCount: 6,
  firstItemErrors: 1
}
```

### 서버 터미널에서 확인:
```
[Analyzer] Starting analysis for 6 items
[Analyzer] Analyzing item 1: 국어
[Analyzer] Criteria errors for 국어: 1
```

## 📊 예상 분석 결과

sample-data.json 업로드 시:

| 교과 | 상태 | 오류 |
|------|------|------|
| 국어 | ❌ | 노력요함 누락 |
| 수학 | ✅ | 없음 |
| 영어 | ❌ | 보통 누락 |
| 사회 | ❌ | 성취기준 형식 오류 |
| 과학 | ✅ | 없음 |
| 체육 | ❌ | 모든 평가기준 누락 (4개) |

**요약**: 전체 6개, 정상 2개, 오류 4개

## ❓ 여전히 안 되면

1. **Node.js 버전 확인**
   ```bash
   node --version
   # v18 이상이어야 함
   ```

2. **전체 재설치**
   ```bash
   rm -rf node_modules .next
   npm install --legacy-peer-deps
   npm run dev
   ```

3. **포트 변경 시도**
   ```bash
   PORT=3001 npm run dev
   # 브라우저에서 http://localhost:3001 접속
   ```
