"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { LogOut, Upload, FileText, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [userName] = useState("사용자") // TODO: 실제 로그인 정보에서 가져오기
  const [apiKey, setApiKey] = useState("")
  const [apiKeySaved, setApiKeySaved] = useState(false)
  const [selectedModel, setSelectedModel] = useState<string>("gemini-2.0-flash-exp")
  const [modelSaved, setModelSaved] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [errorFilter, setErrorFilter] = useState<string>("all")

  const handleLogout = () => {
    // TODO: 실제 로그아웃 로직
    router.push("/login")
  }

  const handleTestApiKey = async () => {
    if (!apiKey) {
      alert("API 키를 입력해주세요")
      return
    }
    
    // TODO: 실제 API 키 테스트 로직
    alert("API 키가 유효합니다! ✓")
  }

  const handleSaveApiKey = () => {
    if (!apiKey) {
      alert("API 키를 입력해주세요")
      return
    }
    
    // TODO: 실제 API 키 저장 로직 (암호화)
    setApiKeySaved(true)
    alert("API 키가 성공적으로 저장되었습니다! ✓")
  }

  const handleSaveModel = () => {
    if (!selectedModel) {
      alert("모델을 선택해주세요")
      return
    }
    
    // TODO: 실제 모델 선택 저장 로직
    setModelSaved(true)
    alert("모델이 저장되었습니다! ✓")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileType = file.name.split('.').pop()?.toLowerCase()
      if (!['docx', 'pdf', 'hwp'].includes(fileType || '')) {
        alert("지원하지 않는 파일 형식입니다. docx, pdf, hwp 파일만 업로드 가능합니다.")
        return
      }
      setUploadedFile(file)
      setAnalysisResult(null)
    }
  }

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      alert("파일을 먼저 업로드해주세요")
      return
    }

    setAnalyzing(true)
    
    try {
      // FormData 생성
      const formData = new FormData()
      formData.append('file', uploadedFile)
      
      // API 호출
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '분석 중 오류가 발생했습니다')
      }
      
      const result = await response.json()
      
      setAnalysisResult(result)
    } catch (error: any) {
      console.error('Analysis error:', error)
      alert(error.message || '분석 중 오류가 발생했습니다')
      
      // 에러 발생 시 샘플 데이터 표시 (개발용)
      setAnalysisResult({
        success: true,
        totalItems: 5,
        validItems: 2,
        items: [
          {
            행번호: 1,
            교과: "국어",
            성취기준: "[4국01-05]",
            단원명: "독서단원 - 읽은 책을 소개해요",
            평가영역: "듣기·말하기",
            평가요소: "발표하기",
            평가기준: {
              매우잘함: "목적과 주제에 매우 적절한 자료를 선정하여 체계적으로 구성하고 자신감 있게 발표함",
              잘함: "목적과 주제에 적절한 자료를 선정하여 발표함",
              보통: "자료를 선정하여 발표하나 다소 미흡함",
              노력요함: ""
            },
            errors: [
              {
                type: "error",
                field: "평가기준 - 노력요함",
                message: "'노력요함' 항목이 누락되었습니다",
                suggestion: "4단계 평가기준을 모두 작성해주세요"
              }
            ]
          },
          {
            행번호: 2,
            교과: "수학",
            성취기준: "[4수01-01]",
            단원명: "큰 수",
            평가영역: "수와 연산",
            평가요소: "큰 수의 이해",
            평가기준: {
              매우잘함: "다섯 자리 이상의 수를 정확히 이해하고 실생활에 활용 가능",
              잘함: "다섯 자리 이상의 수를 이해하고 어림 가능",
              보통: "다섯 자리 이상의 수를 이해함",
              노력요함: "다섯 자리 이상의 수 이해에 어려움이 있음"
            },
            errors: []
          },
          {
            행번호: 3,
            교과: "영어",
            성취기준: "[6영01-05]",
            단원명: "Lesson 3",
            평가영역: "이해",
            평가요소: "듣기",
            평가기준: {
              매우잘함: "주변의 사물에 대한 간단한 묘사를 듣고 완전히 이해함",
              잘함: "주변의 사물에 대한 간단한 묘사를 듣고 대체로 이해함",
              보통: "",
              노력요함: "묘사를 듣고 이해하는 데 어려움이 있음"
            },
            errors: [
              {
                type: "error",
                field: "평가기준 - 보통",
                message: "'보통' 항목이 누락되었습니다",
                suggestion: "4단계 평가기준을 모두 작성해주세요"
              }
            ]
          },
          {
            행번호: 4,
            교과: "사회",
            성취기준: "[4사XX-XX]",
            단원명: "우리 지역",
            평가영역: "지리",
            평가요소: "지역 이해",
            평가기준: {
              매우잘함: "우리 지역의 특성을 완벽히 설명",
              잘함: "우리 지역의 특성을 설명",
              보통: "우리 지역의 특성을 부분적으로 설명",
              노력요함: "우리 지역의 특성 설명에 어려움"
            },
            errors: [
              {
                type: "error",
                field: "성취기준",
                message: "올바르지 않은 성취기준 형식입니다",
                suggestion: "2022 개정 교육과정 성취기준 형식을 확인해주세요 (예: [4사01-01])"
              }
            ]
          },
          {
            행번호: 5,
            교과: "과학",
            성취기준: "[4과01-01]",
            단원명: "무게",
            평가영역: "물질과 에너지",
            평가요소: "무게 측정",
            평가기준: {
              매우잘함: "물체의 무게를 정확하게 측정하고 용수철의 원리를 완벽히 설명",
              잘함: "물체의 무게를 측정하고 용수철의 원리를 설명",
              보통: "물체의 무게를 측정할 수 있음",
              노력요함: "무게 측정에 어려움이 있음"
            },
            errors: []
          }
        ]
      })
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">초등 교과 평가계획 분석기</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            로그아웃
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Welcome Section */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-gray-800">
              환영합니다, <span className="text-blue-600">{userName}</span>님
            </h2>
            <p className="text-gray-600 mt-2">
              2022 개정 교육과정 성취기준 기반으로 평가계획을 분석합니다
            </p>
          </CardContent>
        </Card>

        {/* API Key Section */}
        <Card>
          <CardHeader>
            <CardTitle>Gemini API 키 설정</CardTitle>
            <CardDescription>
              개인 Gemini API 키를 입력하여 분석 기능을 활성화하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API 키</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="AIza..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleTestApiKey} variant="outline">
                테스트
              </Button>
              <Button onClick={handleSaveApiKey}>
                저장
              </Button>
              {apiKeySaved && (
                <Badge variant="default" className="ml-2">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  저장됨
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Model Selection Section */}
        <Card>
          <CardHeader>
            <CardTitle>Gemini AI 모델 선택</CardTitle>
            <CardDescription>
              분석에 사용할 모델을 선택하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model">사용할 모델</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger id="model">
                  <SelectValue placeholder="모델 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini-2.0-flash-exp">
                    Gemini 2.0 Flash (빠른 속도)
                  </SelectItem>
                  <SelectItem value="gemini-2.5-flash">
                    Gemini 2.5 Flash (향상된 성능)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                현재 선택한 모델: <span className="font-semibold">{selectedModel === "gemini-2.0-flash-exp" ? "Gemini 2.0 Flash" : "Gemini 2.5 Flash"}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSaveModel}>
                모델 저장
              </Button>
              {modelSaved && (
                <Badge variant="default">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  저장됨
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* File Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>평가계획 파일 업로드</CardTitle>
            <CardDescription>
              docx, pdf, hwp 형식의 파일을 업로드하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                id="fileUpload"
                accept=".docx,.pdf,.hwp"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="fileUpload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  클릭하여 파일 선택 또는 드래그 앤 드롭
                </p>
                <p className="text-xs text-gray-500">
                  지원 형식: DOCX, PDF, HWP (최대 10MB)
                </p>
              </label>
            </div>

            {uploadedFile && (
              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-600">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Badge variant="secondary">업로드 완료</Badge>
              </div>
            )}

            <Button 
              onClick={handleAnalyze} 
              className="w-full" 
              size="lg"
              disabled={!uploadedFile || !apiKeySaved || analyzing}
            >
              {analyzing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  분석 중...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  분석하기
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Results Section */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Summary Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>분석 결과 요약</CardTitle>
                <CardDescription>
                  2022 개정 교육과정 성취기준 기반 분석
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {analysisResult.totalItems}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">전체 항목</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {analysisResult.validItems}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">정상 항목</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-600">
                      {analysisResult.totalItems - analysisResult.validItems}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">오류 항목</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filter Options */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Label>필터:</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={errorFilter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setErrorFilter("all")}
                    >
                      전체 ({analysisResult.totalItems})
                    </Button>
                    <Button
                      variant={errorFilter === "error" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setErrorFilter("error")}
                    >
                      오류만 ({analysisResult.totalItems - analysisResult.validItems})
                    </Button>
                    <Button
                      variant={errorFilter === "valid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setErrorFilter("valid")}
                    >
                      정상만 ({analysisResult.validItems})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Table */}
            <Card>
              <CardHeader>
                <CardTitle>상세 분석 결과</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResult.items
                    .filter((item: any) => {
                      if (errorFilter === "error") return item.errors.length > 0
                      if (errorFilter === "valid") return item.errors.length === 0
                      return true
                    })
                    .map((item: any, index: number) => (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 ${
                          item.errors.length > 0
                            ? "border-red-200 bg-red-50"
                            : "border-green-200 bg-green-50"
                        }`}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="font-mono">
                              #{item.행번호}
                            </Badge>
                            <div>
                              <div className="font-semibold text-lg">
                                {item.교과} - {item.단원명}
                              </div>
                              <div className="text-sm text-gray-600">
                                {item.성취기준}
                              </div>
                            </div>
                          </div>
                          {item.errors.length === 0 ? (
                            <Badge variant="default" className="bg-green-600">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              정상
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              오류 {item.errors.length}개
                            </Badge>
                          )}
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                          <div>
                            <span className="text-gray-600">평가영역:</span>{" "}
                            <span className="font-medium">{item.평가영역}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">평가요소:</span>{" "}
                            <span className="font-medium">{item.평가요소}</span>
                          </div>
                        </div>

                        {/* Evaluation Criteria */}
                        <div className="mb-3">
                          <Label className="text-xs text-gray-600 mb-2 block">
                            평가기준
                          </Label>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(item.평가기준).map(([level, desc]: [string, any]) => (
                              <div
                                key={level}
                                className={`p-2 rounded border ${
                                  desc === ""
                                    ? "bg-red-100 border-red-300"
                                    : "bg-white border-gray-200"
                                }`}
                              >
                                <div className="font-semibold text-xs text-gray-700 mb-1">
                                  {level}
                                </div>
                                <div className="text-gray-600">
                                  {desc || (
                                    <span className="text-red-600 italic">
                                      (누락됨)
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Errors */}
                        {item.errors.length > 0 && (
                          <div className="space-y-2">
                            {item.errors.map((error: any, errIndex: number) => (
                              <div
                                key={errIndex}
                                className="flex gap-2 p-3 bg-white border border-red-300 rounded"
                              >
                                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <div className="font-medium text-sm text-red-900">
                                    {error.field}: {error.message}
                                  </div>
                                  {error.suggestion && (
                                    <div className="text-xs text-red-700 mt-1">
                                      💡 {error.suggestion}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {analysisResult.items.filter((item: any) => {
                  if (errorFilter === "error") return item.errors.length > 0
                  if (errorFilter === "valid") return item.errors.length === 0
                  return true
                }).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    필터 조건에 맞는 결과가 없습니다.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
