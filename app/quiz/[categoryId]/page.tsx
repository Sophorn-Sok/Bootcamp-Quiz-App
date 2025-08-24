"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/lib/auth-context"
import { Check, X, Clock, Zap, Brain, Target } from "lucide-react"

const TIMER_SECONDS = 15

interface Question {
  id: string
  categoryId: string
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: "A" | "B" | "C" | "D"
  difficulty: "easy" | "medium" | "hard"
}

interface Category {
  id: string
  name: string
  description: string
}

export default function QuizPage({ params }: { params: { categoryId: string } }) {
  const { categoryId } = params
  const [questions, setQuestions] = useState<Question[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [quizFinished, setQuizFinished] = useState(false)
  const [timeTaken, setTimeTaken] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()
  const { user } = useAuth()

  useEffect(() => {
    const fetchQuestionsAndCategory = async () => {
      const { data: questionsData, error: questionsError } = await supabase
        .from("questions")
        .select("*")
        .eq("categoryId", categoryId)

      if (questionsError) {
        console.error("Error fetching questions:", questionsError)
      } else {
        setQuestions(questionsData as Question[])
      }

      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("*")
        .eq("id", categoryId)
        .single()

      if (categoryError) {
        console.error("Error fetching category:", categoryError)
      } else {
        setCategory(categoryData as Category)
      }
      setLoading(false)
    }

    if (categoryId) {
      fetchQuestionsAndCategory()
    }
  }, [categoryId, supabase])

  useEffect(() => {
    if (quizFinished) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          handleNextQuestion()
          return TIMER_SECONDS
        }
        return prevTime - 1
      })
      setTimeTaken((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestionIndex, quizFinished])

  const handleAnswerSelect = (option: string) => {
    if (showFeedback) return

    setSelectedAnswer(option)
    const correct = questions[currentQuestionIndex].correctAnswer === option
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
    setShowFeedback(true)

    setTimeout(() => {
      handleNextQuestion()
    }, 1500)
  }

  const handleNextQuestion = () => {
    setShowFeedback(false)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setTimeLeft(TIMER_SECONDS)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizFinished(true)
    }
  }

  const getButtonClass = (option: string) => {
    if (!showFeedback) {
      return "bg-white hover:bg-gray-100 text-gray-800"
    }
    const isSelected = selectedAnswer === option
    const isCorrectAnswer = questions[currentQuestionIndex].correctAnswer === option

    if (isCorrectAnswer) {
      return "bg-green-500 text-white"
    }
    if (isSelected && !isCorrect) {
      return "bg-red-500 text-white"
    }
    return "bg-white text-gray-800 opacity-50"
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (quizFinished && user) {
      const saveAttempt = async () => {
        const { data: quizData, error: quizError } = await supabase
          .from("quizzes")
          .select("id")
          .eq("category", category?.name)
          .single()

        if (quizError || !quizData) {
          console.error("Error fetching quiz id:", quizError)
          return
        }

        const attempt = {
          userId: user.id,
          quizId: quizData.id,
          score: score,
          completedAt: new Date().toISOString(),
          total_questions: questions.length,
          time_taken: timeTaken,
        }

        const { error } = await supabase.from("user_quiz_attempts").insert([attempt])

        if (error) {
          console.error("Error saving quiz attempt:", error)
        }
      }

      saveAttempt()
    }
  }, [quizFinished, user, score, questions.length, timeTaken, category, supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin mx-auto mb-4 flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg font-bold text-gray-600">Loading questions... 🧠</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Questions Yet!</h2>
          <p className="text-gray-600">There are no questions available for this category yet. Please check back later.</p>
          <Button onClick={() => router.push('/')} className="mt-6">Back to Home</Button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  if (quizFinished) {
    const accuracy = (score / questions.length) * 100

    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <Card className="w-full max-w-2xl text-center quiz-card">
          <CardHeader>
            <CardTitle className="text-3xl font-playful bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Quiz Complete! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-lg font-semibold text-gray-600">Score</p>
                <p className="text-3xl font-bold text-green-500">
                  {score} / {questions.length}
                </p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-lg font-semibold text-gray-600">Accuracy</p>
                <p className="text-3xl font-bold text-blue-500">{accuracy.toFixed(0)}%</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-lg font-semibold text-gray-600">Time</p>
                <p className="text-3xl font-bold text-purple-500">{formatTime(timeTaken)}</p>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-8">
              <Button onClick={() => router.push("/")} className="h-12 px-6 text-lg">
                Play Again
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/leaderboard")}
                className="h-12 px-6 text-lg"
              >
                View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <Card className="w-full max-w-3xl quiz-card">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-playful text-gray-800">{category?.name || "Quiz"}</CardTitle>
                <p className="text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-red-500" />
              <span className="text-xl font-bold text-red-500">{timeLeft}</span>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent className="pt-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">
            {currentQuestion.question}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(new Array(4).fill(0).map((_, i) => String.fromCharCode(65 + i)) as ("A" | "B" | "C" | "D")[]).map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
                className={`h-auto py-4 px-6 text-lg justify-start transition-all duration-300 transform hover:scale-105 ${getButtonClass(
                  option,
                )}`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-md mr-4 flex items-center justify-center font-bold border-2 ${
                      showFeedback && questions[currentQuestionIndex].correctAnswer === option
                        ? "bg-white text-green-500 border-green-500"
                        : showFeedback && selectedAnswer === option
                          ? "bg-white text-red-500 border-red-500"
                          : "bg-gray-200 text-gray-700 border-gray-300"
                    }`}
                  >
                    {option}
                  </div>
                  <span>{currentQuestion[`option${option}` as keyof Question]}</span>
                </div>
                {showFeedback && questions[currentQuestionIndex].correctAnswer === option && (
                  <Check className="w-6 h-6 ml-auto text-white" />
                )}
                {showFeedback &&
                  selectedAnswer === option &&
                  questions[currentQuestionIndex].correctAnswer !== option && (
                    <X className="w-6 h-6 ml-auto text-white" />
                  )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
