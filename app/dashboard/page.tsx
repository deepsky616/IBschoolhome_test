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
    
    if (!apiKeySaved) {
      alert("Gemini API 키를 먼저 저장해주세요")
      return
    }

    setAnalyzing(true)
    
    // TODO: 실제 분석 로직
    setTimeout(() => {
      setAnalysisResult({
        success: true,
        교과: "국어",
        성취기준: "[4국01-05]",
        errors: [
          {
            type: "warning",
            field: "평가기준",
            message: "'매우잘함' 항목이 누락되었습니다",
            suggestion: "4단계 평가기준을 모두 작성해주세요"
          }
        ]
      })
      setAnalyzing(false)
    }, 2000)
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
          <Card>
            <CardHeader>
              <CardTitle>분석 결과</CardTitle>
              <CardDescription>
                2022 개정 교육과정 성취기준 기반 분석 결과입니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-600">교과</Label>
                  <p className="font-medium">{analysisResult.교과}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">성취기준</Label>
                  <p className="font-medium">{analysisResult.성취기준}</p>
                </div>
              </div>

              {analysisResult.errors && analysisResult.errors.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">발견된 문제점</Label>
                  {analysisResult.errors.map((error: any, index: number) => (
                    <div 
                      key={index}
                      className="flex gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                    >
                      <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-yellow-900">
                          {error.field}: {error.message}
                        </p>
                        {error.suggestion && (
                          <p className="text-xs text-yellow-700 mt-1">
                            💡 제안: {error.suggestion}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {analysisResult.errors.length === 0 && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-900 font-medium">
                    오류가 발견되지 않았습니다! 평가계획이 올바르게 작성되었습니다.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
