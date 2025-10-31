// API 분석 로직 직접 테스트
const fs = require('fs');

// TypeScript 파일을 직접 실행할 수 없으므로
// 분석 로직을 JavaScript로 재작성하여 테스트

const data = JSON.parse(fs.readFileSync('./sample-data.json', 'utf-8'));

function validateAchievementCode(code) {
  const pattern = /^\[(\d)[가-힣a-zA-Z]+\d{2}-\d{2}\]$/;
  return pattern.test(code);
}

function validateEvaluationCriteria(criteria) {
  const errors = [];
  const levels = ['매우잘함', '잘함', '보통', '노력요함'];
  
  levels.forEach(level => {
    const value = criteria[level];
    if (!value || value.trim() === '') {
      errors.push({
        type: 'error',
        field: `평가기준 - ${level}`,
        message: `'${level}' 항목이 누락되었습니다`,
        suggestion: '4단계 평가기준을 모두 작성해주세요 (매우잘함/잘함/보통/노력요함)'
      });
    } else if (value.length < 10) {
      errors.push({
        type: 'warning',
        field: `평가기준 - ${level}`,
        message: `'${level}' 항목의 설명이 너무 짧습니다 (${value.length}자)`,
        suggestion: '구체적인 평가 기준을 작성해주세요 (최소 10자 이상 권장)'
      });
    }
  });
  
  return errors;
}

function analyzeEvaluationPlan(items) {
  let validCount = 0;
  
  const analyzedItems = items.map((item, index) => {
    const errors = [];
    
    // 1. 교과명 검증 (간소화)
    if (!item.교과 || item.교과.trim() === '') {
      errors.push({
        type: 'error',
        field: '교과',
        message: '교과명이 누락되었습니다',
        suggestion: '교과명을 입력해주세요'
      });
    }
    
    // 2. 성취기준 형식 검증
    if (!item.성취기준 || item.성취기준.trim() === '') {
      errors.push({
        type: 'error',
        field: '성취기준',
        message: '성취기준이 누락되었습니다',
        suggestion: '2022 개정 교육과정 성취기준을 입력해주세요 (예: [4국01-05])'
      });
    } else if (!validateAchievementCode(item.성취기준)) {
      errors.push({
        type: 'error',
        field: '성취기준',
        message: '올바르지 않은 성취기준 형식입니다',
        suggestion: '성취기준 형식을 확인해주세요 (예: [4국01-05], [6영02-01])'
      });
    }
    
    // 3. 단원명 검증
    if (!item.단원명 || item.단원명.trim() === '') {
      errors.push({
        type: 'error',
        field: '단원명',
        message: '단원명이 누락되었습니다',
        suggestion: '단원명을 입력해주세요'
      });
    }
    
    // 4. 평가기준 4단계 검증
    if (!item.평가기준) {
      errors.push({
        type: 'error',
        field: '평가기준',
        message: '평가기준이 누락되었습니다',
        suggestion: '4단계 평가기준을 작성해주세요'
      });
    } else {
      const criteriaErrors = validateEvaluationCriteria(item.평가기준);
      errors.push(...criteriaErrors);
    }
    
    if (errors.length === 0) {
      validCount++;
    }
    
    return {
      행번호: index + 1,
      교과: item.교과,
      성취기준: item.성취기준,
      단원명: item.단원명,
      평가영역: item.평가영역,
      평가요소: item.평가요소,
      평가기준: item.평가기준,
      errors
    };
  });
  
  return {
    totalItems: items.length,
    validItems: validCount,
    items: analyzedItems
  };
}

// 테스트 실행
console.log('=== API 분석 로직 테스트 ===\n');
const result = analyzeEvaluationPlan(data);

console.log('분석 결과 요약:');
console.log(`- 전체 항목: ${result.totalItems}`);
console.log(`- 정상 항목: ${result.validItems}`);
console.log(`- 오류 항목: ${result.totalItems - result.validItems}`);

console.log('\n각 항목별 상세:');
result.items.forEach(item => {
  const status = item.errors.length === 0 ? '✅ 정상' : `❌ ${item.errors.length}개 오류`;
  console.log(`${item.행번호}. ${item.교과} (${item.성취기준}): ${status}`);
  if (item.errors.length > 0) {
    item.errors.forEach(err => {
      console.log(`   - ${err.field}: ${err.message}`);
    });
  }
});

// JSON 출력 (API 응답 형태)
console.log('\n=== API 응답 형태 (JSON) ===');
console.log(JSON.stringify({
  totalItems: result.totalItems,
  validItems: result.validItems,
  items: result.items.map(item => ({
    행번호: item.행번호,
    교과: item.교과,
    errorCount: item.errors.length
  }))
}, null, 2));
