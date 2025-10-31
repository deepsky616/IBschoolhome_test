// 분석기 테스트 스크립트
const fs = require('fs');

// 샘플 데이터 로드
const data = JSON.parse(fs.readFileSync('./sample-data.json', 'utf-8'));

console.log('=== 샘플 데이터 확인 ===');
console.log('총 항목 수:', data.length);
console.log('\n각 항목 평가기준 상태:');

data.forEach((item, i) => {
  console.log(`\n${i + 1}. ${item.교과}`);
  console.log('  성취기준:', item.성취기준);
  Object.entries(item.평가기준).forEach(([level, desc]) => {
    const isEmpty = !desc || desc.trim() === '';
    const status = isEmpty ? '❌ 누락' : '✅ 있음';
    console.log(`  ${level}: ${status} (길이: ${desc.length}자)`);
  });
});

// 간단한 검증 로직 테스트
console.log('\n\n=== 검증 로직 테스트 ===');

function validateAchievementCode(code) {
  const pattern = /^\[(\d)[가-힣a-zA-Z]+\d{2}-\d{2}\]$/;
  return pattern.test(code);
}

data.forEach((item, i) => {
  console.log(`\n${i + 1}. ${item.교과}`);
  
  // 성취기준 검증
  const isValid = validateAchievementCode(item.성취기준);
  console.log(`  성취기준 형식: ${isValid ? '✅ 정상' : '❌ 오류'} (${item.성취기준})`);
  
  // 평가기준 검증
  let missingCount = 0;
  ['매우잘함', '잘함', '보통', '노력요함'].forEach(level => {
    const value = item.평가기준[level];
    if (!value || value.trim() === '') {
      missingCount++;
      console.log(`  ${level}: ❌ 누락`);
    }
  });
  
  console.log(`  총 오류: ${missingCount + (isValid ? 0 : 1)}개`);
});

console.log('\n\n=== 예상 분석 결과 ===');
let totalErrors = 0;
let validItems = 0;

data.forEach((item, i) => {
  let itemErrors = 0;
  
  // 성취기준 오류
  if (!validateAchievementCode(item.성취기준)) {
    itemErrors++;
  }
  
  // 평가기준 오류
  ['매우잘함', '잘함', '보통', '노력요함'].forEach(level => {
    const value = item.평가기준[level];
    if (!value || value.trim() === '') {
      itemErrors++;
    }
  });
  
  if (itemErrors === 0) {
    validItems++;
  } else {
    totalErrors += itemErrors;
  }
  
  console.log(`${i + 1}. ${item.교과}: ${itemErrors > 0 ? `❌ ${itemErrors}개 오류` : '✅ 정상'}`);
});

console.log(`\n전체 항목: ${data.length}`);
console.log(`정상 항목: ${validItems}`);
console.log(`오류 항목: ${data.length - validItems}`);
console.log(`총 오류 수: ${totalErrors}`);
