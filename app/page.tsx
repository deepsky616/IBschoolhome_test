"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Users, MessageSquare, Bell, GraduationCap, Globe, Award, ChevronRight } from "lucide-react"

// Mock data for demonstration
const announcements = [
  {
    id: 1,
    title: "IB 디플로마 프로그램 설명회",
    content: "2024년 3월 15일 오후 2시, 학교 강당에서 IB 디플로마 프로그램에 대한 설명회가 있습니다.",
    date: "2024-03-10",
    priority: "high",
  },
  {
    id: 2,
    title: "CAS 활동 제출 마감일 안내",
    content: "CAS 활동 보고서 제출 마감일이 3월 20일입니다. 늦지 않도록 주의해주세요.",
    date: "2024-03-08",
    priority: "medium",
  },
]

const recentQuestions = [
  {
    id: 1,
    question: "TOK 에세이에서 지식 영역을 어떻게 연결해야 하나요?",
    category: "conceptual",
    author: "김학생",
    date: "2024-03-09",
  },
  {
    id: 2,
    question: "Extended Essay의 최소 단어 수는 얼마인가요?",
    category: "factual",
    author: "이학생",
    date: "2024-03-08",
  },
]

export default function IBSchoolLanding() {
  const [activeTab, setActiveTab] = useState("home")
  const [newQuestion, setNewQuestion] = useState("")
  const [questions, setQuestions] = useState(recentQuestions)

  const categorizeQuestion = (question: string) => {
    // Simple AI categorization logic (in real app, this would use actual AI)
    const factualKeywords = ["얼마", "언제", "어디", "몇", "무엇"]
    const conceptualKeywords = ["어떻게", "왜", "방법", "이유", "원리"]
    const argumentativeKeywords = ["생각", "의견", "찬성", "반대", "논증"]

    const lowerQuestion = question.toLowerCase()

    if (argumentativeKeywords.some((keyword) => lowerQuestion.includes(keyword))) {
      return "argumentative"
    } else if (conceptualKeywords.some((keyword) => lowerQuestion.includes(keyword))) {
      return "conceptual"
    } else if (factualKeywords.some((keyword) => lowerQuestion.includes(keyword))) {
      return "factual"
    }
    return "conceptual" // default
  }

  const handleQuestionSubmit = () => {
    if (newQuestion.trim()) {
      const category = categorizeQuestion(newQuestion)
      const newQ = {
        id: questions.length + 1,
        question: newQuestion,
        category,
        author: "현재 사용자",
        date: new Date().toISOString().split("T")[0],
      }
      setQuestions([newQ, ...questions])
      setNewQuestion("")
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "factual":
        return "bg-blue-100 text-blue-800"
      case "conceptual":
        return "bg-green-100 text-green-800"
      case "argumentative":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "factual":
        return "사실적"
      case "conceptual":
        return "개념적"
      case "argumentative":
        return "논증적"
      default:
        return "기타"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-serif font-bold text-primary">IB School</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab("home")}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "home" ? "bg-primary text-white" : "text-neutral-600 hover:text-primary"
                }`}
              >
                홈
              </button>
              <button
                onClick={() => setActiveTab("announcements")}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "announcements" ? "bg-primary text-white" : "text-neutral-600 hover:text-primary"
                }`}
              >
                공지사항
              </button>
              <button
                onClick={() => setActiveTab("questions")}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "questions" ? "bg-primary text-white" : "text-neutral-600 hover:text-primary"
                }`}
              >
                질문 게시판
              </button>
              <button
                onClick={() => setActiveTab("students")}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "students" ? "bg-primary text-white" : "text-neutral-600 hover:text-primary"
                }`}
              >
                학생 관리
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Home Tab */}
        {activeTab === "home" && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center py-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                국제 바칼로레아 교육의 <span className="text-primary">우수성</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                글로벌 시민으로 성장할 수 있도록 돕는 IB 교육과정을 통해 비판적 사고력과 창의성을 기르고 있습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  프로그램 알아보기
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  입학 상담 신청
                </Button>
              </div>
            </section>

            {/* Features Grid */}
            <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">IB 디플로마</h3>
                <p className="text-sm text-muted-foreground">국제적으로 인정받는 IB 디플로마 프로그램</p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">글로벌 교육</h3>
                <p className="text-sm text-muted-foreground">다문화 환경에서의 국제적 감각 배양</p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">우수한 성과</h3>
                <p className="text-sm text-muted-foreground">세계 명문대학 진학률 95% 달성</p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">개별 지도</h3>
                <p className="text-sm text-muted-foreground">소규모 학급으로 개인별 맞춤 교육</p>
              </Card>
            </section>

            {/* Quick Access */}
            <section>
              <h3 className="text-2xl font-serif font-bold mb-6">빠른 접근</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setActiveTab("announcements")}
                >
                  <CardHeader className="flex flex-row items-center gap-3">
                    <Bell className="h-5 w-5 text-accent" />
                    <CardTitle className="text-lg">최신 공지사항</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{announcements[0]?.title}</p>
                    <Badge variant="secondary" className="text-xs">
                      {announcements.length}개의 새 공지
                    </Badge>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setActiveTab("questions")}
                >
                  <CardHeader className="flex flex-row items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-secondary" />
                    <CardTitle className="text-lg">질문 게시판</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">AI가 자동으로 질문을 분류합니다</p>
                    <Badge variant="secondary" className="text-xs">
                      {questions.length}개의 질문
                    </Badge>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setActiveTab("students")}
                >
                  <CardHeader className="flex flex-row items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">학생 관리</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">학생 정보 및 성적 관리</p>
                    <Badge variant="secondary" className="text-xs">
                      관리자 전용
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-serif font-bold">공지사항</h2>
              <Button className="bg-primary hover:bg-primary/90">
                <Bell className="mr-2 h-4 w-4" />새 공지 작성
              </Button>
            </div>

            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <CardDescription>{announcement.date}</CardDescription>
                      </div>
                      <Badge
                        variant={announcement.priority === "high" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {announcement.priority === "high" ? "긴급" : "일반"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === "questions" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-serif font-bold">질문 게시판</h2>
              <Badge variant="outline" className="text-sm">
                AI 자동 분류 시스템
              </Badge>
            </div>

            {/* Question Submission */}
            <Card>
              <CardHeader>
                <CardTitle>새 질문 작성</CardTitle>
                <CardDescription>질문을 작성하면 AI가 자동으로 사실적, 개념적, 논증적으로 분류합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="질문을 입력해주세요..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={handleQuestionSubmit} className="bg-primary hover:bg-primary/90">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  질문 등록
                </Button>
              </CardContent>
            </Card>

            {/* Questions List */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">최근 질문들</h3>
              {questions.map((q) => (
                <Card key={q.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{q.question}</CardTitle>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{q.author}</span>
                          <span>•</span>
                          <span>{q.date}</span>
                        </div>
                      </div>
                      <Badge className={getCategoryColor(q.category)}>{getCategoryLabel(q.category)}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-serif font-bold">학생 관리</h2>
              <Button className="bg-primary hover:bg-primary/90">
                <Users className="mr-2 h-4 w-4" />
                학생 추가
              </Button>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>학생 검색</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input placeholder="학생 이름 또는 학번으로 검색..." className="flex-1" />
                  <Button variant="outline">검색</Button>
                </div>
              </CardContent>
            </Card>

            {/* Student Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-primary">156</div>
                <div className="text-sm text-muted-foreground">전체 학생</div>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-secondary">89</div>
                <div className="text-sm text-muted-foreground">IB 디플로마</div>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-accent">67</div>
                <div className="text-sm text-muted-foreground">MYP 과정</div>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">출석률</div>
              </Card>
            </div>

            {/* Student Management Features */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>성적 관리</CardTitle>
                  <CardDescription>학생들의 IB 과목별 성적을 관리합니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    성적 입력/수정
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>CAS 활동 관리</CardTitle>
                  <CardDescription>창의성, 활동, 봉사 활동을 추적합니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    CAS 활동 확인
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
