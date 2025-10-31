import { NextRequest, NextResponse } from 'next/server'
import { analyzeEvaluationPlan } from '@/lib/analyzer'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: '파일이 제공되지 않았습니다' },
        { status: 400 }
      )
    }

    // 파일 확장자 확인
    const fileName = file.name.toLowerCase()
    const isSupported = fileName.endsWith('.docx') || 
                       fileName.endsWith('.pdf') || 
                       fileName.endsWith('.hwp') ||
                       fileName.endsWith('.json') ||
                       fileName.endsWith('.txt')
    
    if (!isSupported) {
      return NextResponse.json(
        { error: '지원하지 않는 파일 형식입니다. docx, pdf, hwp, json, txt 파일만 지원됩니다.' },
        { status: 400 }
      )
    }

    // 파일 읽기
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 파일 파싱 (임시로 텍스트 추출)
    let parsedData: any[] = []
    
    try {
      // 임시: JSON 형식으로 업로드된 데이터 파싱
      const text = buffer.toString('utf-8')
      
      // JSON 형식인 경우
      if (text.trim().startsWith('[') || text.trim().startsWith('{')) {
        const jsonData = JSON.parse(text)
        parsedData = Array.isArray(jsonData) ? jsonData : [jsonData]
      } else {
        // 텍스트 파일인 경우 기본 파싱
        parsedData = parseTextFile(text)
      }
    } catch (error) {
      return NextResponse.json(
        { error: '파일 파싱 중 오류가 발생했습니다. 파일 형식을 확인해주세요.' },
        { status: 400 }
      )
    }

    // 분석 수행
    console.log('Parsed data count:', parsedData.length)
    console.log('Sample item:', JSON.stringify(parsedData[0], null, 2))
    
    const result = analyzeEvaluationPlan(parsedData)
    
    console.log('Analysis result:', {
      totalItems: result.totalItems,
      validItems: result.validItems,
      firstItemErrors: result.items[0]?.errors?.length || 0
    })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: error.message || '분석 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

// 텍스트 파일 기본 파싱 함수
function parseTextFile(text: string): any[] {
  const lines = text.split('\n').filter(line => line.trim())
  const items: any[] = []
  
  // 간단한 키-값 파싱
  let currentItem: any = { 행번호: 1, 평가기준: {} }
  let inCriteria = false
  
  lines.forEach((line) => {
    const trimmed = line.trim()
    
    if (trimmed.includes('교과:') || trimmed.includes('교과-')) {
      if (currentItem.교과) {
        items.push(currentItem)
        currentItem = { 
          행번호: items.length + 1, 
          평가기준: {} 
        }
      }
      currentItem.교과 = trimmed.split(/[:|-]/)[1]?.trim() || ''
    } else if (trimmed.includes('성취기준:') || trimmed.includes('성취기준-')) {
      currentItem.성취기준 = trimmed.split(/[:|-]/)[1]?.trim() || ''
    } else if (trimmed.includes('단원명:') || trimmed.includes('단원명-')) {
      currentItem.단원명 = trimmed.split(/[:|-]/)[1]?.trim() || ''
    } else if (trimmed.includes('평가영역:') || trimmed.includes('평가영역-')) {
      currentItem.평가영역 = trimmed.split(/[:|-]/)[1]?.trim() || ''
    } else if (trimmed.includes('평가요소:') || trimmed.includes('평가요소-')) {
      currentItem.평가요소 = trimmed.split(/[:|-]/)[1]?.trim() || ''
    } else if (trimmed.includes('매우잘함:') || trimmed.includes('매우잘함-')) {
      currentItem.평가기준.매우잘함 = trimmed.split(/[:|-]/)[1]?.trim() || ''
    } else if (trimmed.includes('잘함:') || trimmed.includes('잘함-')) {
      currentItem.평가기준.잘함 = trimmed.split(/[:|-]/)[1]?.trim() || ''
    } else if (trimmed.includes('보통:') || trimmed.includes('보통-')) {
      currentItem.평가기준.보통 = trimmed.split(/[:|-]/)[1]?.trim() || ''
    } else if (trimmed.includes('노력요함:') || trimmed.includes('노력요함-')) {
      currentItem.평가기준.노력요함 = trimmed.split(/[:|-]/)[1]?.trim() || ''
    }
  })
  
  if (currentItem.교과) {
    items.push(currentItem)
  }
  
  return items
}
