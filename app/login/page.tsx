"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = () => {
    // TODO: Google OAuth 연동 (NextAuth.js)
    // 임시로 대시보드로 이동
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              초등 교과 평가계획 분석기
            </CardTitle>
            <CardDescription className="text-base">
              2022 개정 교육과정 성취기준을 기반으로<br />
              평가계획을 자동으로 분석하고 검증합니다
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          <Button 
            onClick={handleLogin}
            className="w-full h-12 text-base font-medium bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 shadow-sm"
            size="lg"
          >
            <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google 계정으로 로그인
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              로그인하시면{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                이용약관
              </a>
              {" "}및{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                개인정보처리방침
              </a>
              에<br />
              동의하는 것으로 간주됩니다
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
