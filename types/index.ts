export interface User {
  id: string
  email: string
  name: string
  image?: string
}

export interface GeminiConfig {
  apiKey: string
  model: 'gemini-2.0-flash-exp' | 'gemini-2.5-flash'
}

export interface UploadedFile {
  name: string
  type: string
  size: number
  content?: string
}

export interface AnalysisResult {
  교과: string
  성취기준: string
  단원명: string
  평가영역: string
  평가요소: string
  평가기준: {
    매우잘함: string
    잘함: string
    보통: string
    노력요함: string
  }
  errors: AnalysisError[]
}

export interface AnalysisError {
  type: 'error' | 'warning' | 'info'
  field: string
  message: string
  suggestion?: string
}

export interface Achievement {
  code: string
  subject: string
  grade: string
  description: string
  unit?: string
}
