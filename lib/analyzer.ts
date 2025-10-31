// 평가계획 분석 로직

interface EvaluationCriteria {
  매우잘함: string
  잘함: string
  보통: string
  노력요함: string
}

interface AnalysisItem {
  행번호: number
  교과: string
  성취기준: string
  단원명: string
  평가영역: string
  평가요소: string
  평가기준: EvaluationCriteria
  errors: Array<{
    type: 'error' | 'warning'
    field: string
    message: string
    suggestion?: string
  }>
}

// 성취기준 형식 검증 (예: [4국01-05])
function validateAchievementCode(code: string): boolean {
  const pattern = /^\[(\d)[가-힣a-zA-Z]+\d{2}-\d{2}\]$/
  return pattern.test(code)
}

// 평가기준 4단계 검증
function validateEvaluationCriteria(criteria: EvaluationCriteria): Array<{
  type: 'error' | 'warning'
  field: string
  message: string
  suggestion?: string
}> {
  const errors: Array<any> = []
  
  const levels = ['매우잘함', '잘함', '보통', '노력요함']
  
  levels.forEach(level => {
    const value = criteria[level as keyof EvaluationCriteria]
    if (!value || value.trim() === '') {
      errors.push({
        type: 'error',
        field: `평가기준 - ${level}`,
        message: `'${level}' 항목이 누락되었습니다`,
        suggestion: '4단계 평가기준을 모두 작성해주세요 (매우잘함/잘함/보통/노력요함)'
      })
    } else if (value.length < 10) {
      errors.push({
        type: 'warning',
        field: `평가기준 - ${level}`,
        message: `'${level}' 항목의 설명이 너무 짧습니다 (${value.length}자)`,
        suggestion: '구체적인 평가 기준을 작성해주세요 (최소 10자 이상 권장)'
      })
    }
  })
  
  return errors
}

// 교과명 검증
function validateSubject(subject: string): boolean {
  const validSubjects = ['국어', '수학', '사회', '과학', '영어', '체육', '음악', '미술', '실과']
  return validSubjects.includes(subject)
}

// 파일 내용 파싱 (임시 - 실제로는 docx/pdf/hwp 파서 필요)
export function parseFileContent(content: string): AnalysisItem[] {
  // TODO: 실제 파일 파싱 구현
  // 현재는 임시로 텍스트 기반 파싱
  
  const lines = content.split('\n').filter(line => line.trim())
  const items: AnalysisItem[] = []
  
  // 간단한 파싱 로직 (실제로는 더 복잡한 파싱 필요)
  let currentItem: Partial<AnalysisItem> = {}
  let rowNumber = 1
  
  lines.forEach((line, index) => {
    // 예시 파싱 로직
    if (line.includes('교과:') || line.includes('교과-')) {
      if (currentItem.교과) {
        // 이전 항목 저장
        items.push(currentItem as AnalysisItem)
        currentItem = {}
        rowNumber++
      }
      currentItem.행번호 = rowNumber
      currentItem.교과 = line.split(/[:|-]/)[1]?.trim() || ''
    }
    // 추가 파싱 로직...
  })
  
  return items
}

// 메인 분석 함수
export function analyzeEvaluationPlan(items: AnalysisItem[]): {
  totalItems: number
  validItems: number
  items: AnalysisItem[]
} {
  console.log('[Analyzer] Starting analysis for', items.length, 'items')
  let validCount = 0
  
  const analyzedItems = items.map((item, index) => {
    console.log(`[Analyzer] Analyzing item ${index + 1}:`, item.교과)
    const errors: Array<any> = []
    
    // 1. 교과명 검증
    if (!item.교과 || item.교과.trim() === '') {
      errors.push({
        type: 'error',
        field: '교과',
        message: '교과명이 누락되었습니다',
        suggestion: '교과명을 입력해주세요 (국어/수학/사회/과학/영어 등)'
      })
    } else if (!validateSubject(item.교과)) {
      errors.push({
        type: 'warning',
        field: '교과',
        message: '표준 교과명이 아닙니다',
        suggestion: '표준 교과명을 사용해주세요 (국어/수학/사회/과학/영어/체육/음악/미술/실과)'
      })
    }
    
    // 2. 성취기준 형식 검증
    if (!item.성취기준 || item.성취기준.trim() === '') {
      errors.push({
        type: 'error',
        field: '성취기준',
        message: '성취기준이 누락되었습니다',
        suggestion: '2022 개정 교육과정 성취기준을 입력해주세요 (예: [4국01-05])'
      })
    } else if (!validateAchievementCode(item.성취기준)) {
      errors.push({
        type: 'error',
        field: '성취기준',
        message: '올바르지 않은 성취기준 형식입니다',
        suggestion: '성취기준 형식을 확인해주세요 (예: [4국01-05], [6영02-01])'
      })
    }
    
    // 3. 단원명 검증
    if (!item.단원명 || item.단원명.trim() === '') {
      errors.push({
        type: 'error',
        field: '단원명',
        message: '단원명이 누락되었습니다',
        suggestion: '단원명을 입력해주세요'
      })
    }
    
    // 4. 평가영역 검증
    if (!item.평가영역 || item.평가영역.trim() === '') {
      errors.push({
        type: 'warning',
        field: '평가영역',
        message: '평가영역이 누락되었습니다',
        suggestion: '평가영역을 입력해주세요'
      })
    }
    
    // 5. 평가요소 검증
    if (!item.평가요소 || item.평가요소.trim() === '') {
      errors.push({
        type: 'warning',
        field: '평가요소',
        message: '평가요소가 누락되었습니다',
        suggestion: '평가요소를 입력해주세요'
      })
    }
    
    // 6. 평가기준 4단계 검증
    if (!item.평가기준) {
      errors.push({
        type: 'error',
        field: '평가기준',
        message: '평가기준이 누락되었습니다',
        suggestion: '4단계 평가기준을 작성해주세요 (매우잘함/잘함/보통/노력요함)'
      })
    } else {
      const criteriaErrors = validateEvaluationCriteria(item.평가기준)
      console.log(`[Analyzer] Criteria errors for ${item.교과}:`, criteriaErrors.length)
      errors.push(...criteriaErrors)
    }
    
    console.log(`[Analyzer] Total errors for ${item.교과}:`, errors.length)
    
    if (errors.length === 0) {
      validCount++
    }
    
    return {
      ...item,
      errors
    }
  })
  
  return {
    totalItems: items.length,
    validItems: validCount,
    items: analyzedItems
  }
}

// Gemini API를 사용한 분석 (향후 구현)
export async function analyzeWithGemini(
  apiKey: string,
  model: string,
  fileContent: string
): Promise<AnalysisItem[]> {
  // TODO: Gemini API 통합
  // 1. 파일 내용을 Gemini에 전달
  // 2. 2022 개정 교육과정 성취기준과 비교
  // 3. 평가기준 4단계 검증
  // 4. 분석 결과 반환
  
  throw new Error('Gemini API integration not implemented yet')
}
