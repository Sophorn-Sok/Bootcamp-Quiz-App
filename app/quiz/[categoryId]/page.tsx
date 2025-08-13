"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { mockQuestions, mockCategories, mockQuizAttempts, type Question } from "@/lib/mock-data"
import { Clock, CheckCircle, Zap, Brain, Star, Trophy, Target } from "lucide-react"

const questionIcons = {
  "1": "🌍", // General Knowledge
  "2": "🔬", // Science
  "3": "🏛️", // History
  "4": "⚽", // Sports
  "5": "💻", // Technology
}

const answerEmojis = ["A", "B", "C", "D"]

export default function QuizPage() {
  const { user } = useAuth()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [startTime, setStartTime] = useState<Date>(new Date())
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const router = useRouter()
  const params = useParams()
  const categoryId = params.categoryId as string
  const category = mockCategories.find((c) => c.id === categoryId)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    const categoryQuestions = mockQuestions.filter((q) => q.categoryId === categoryId)
    const shuffled = [...categoryQuestions].sort(() => 0.5 - Math.random()).slice(0, 10)
    setQuestions(shuffled)
    setStartTime(new Date())
    setLoading(false)
  }, [user, router, categoryId])

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted && questions.length > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !quizCompleted && questions.length > 0 && !showFeedback) {
      handleNextQuestion()
    }
  }, [timeLeft, quizCompleted, questions.length, showFeedback])

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = async () => {
    const correct = selectedAnswer === questions[currentQuestionIndex]?.correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    setTimeout(() => {
      let newScore = score
      if (correct) {
        newScore = score + 1
        setScore(newScore)
      }

      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer("")
        setTimeLeft(30)
        setShowFeedback(false)
      } else {
        setQuizCompleted(true)
        saveQuizResult(newScore)
      }
    }, 2000)
  }

  const saveQuizResult = async (finalScore: number) => {
    if (!user) return

    const endTime = new Date()
    const timeTaken = Math.floor((endTime.getTime() - startTime.getTime()) / 1000)

    const newAttempt = {
      id: Date.now().toString(),
      userId: user.id,
      categoryId: categoryId,
      score: finalScore,
      totalQuestions: questions.length,
      timeTaken: timeTaken,
      completedAt: new Date().toISOString(),
      username: user.username,
      categoryName: category?.name || "Unknown",
    }

    mockQuizAttempts.unshift(newAttempt)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse mx-auto mb-6 flex items-center justify-center">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <p className="text-2xl font-playful text-gray-600">Preparing your quiz... 🎯</p>
        </div>
      </div>
    )
  }

  if (!user || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="quiz-card p-8 text-center">
          <div className="text-6xl mb-4">😅</div>
          <h2 className="text-2xl font-playful text-gray-800 mb-4">Oops! No questions here</h2>
          <p className="text-gray-600 mb-6">This category needs some questions first!</p>
          <Button onClick={() => router.push("/")} className="rounded-2xl">
            Go Back Home 🏠
          </Button>
        </Card>
      </div>
    )
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100)

    let emoji = "🎉"
    let message = "Amazing work!"
    let color = "from-green-400 to-emerald-500"

    if (percentage >= 90) {
      emoji = "🏆"
      message = "Perfect! You're a genius!"
      color = "from-yellow-400 to-orange-500"
    } else if (percentage >= 70) {
      emoji = "⭐"
      message = "Great job! Keep it up!"
      color = "from-blue-400 to-purple-500"
    } else if (percentage >= 50) {
      emoji = "👍"
      message = "Good effort! Practice makes perfect!"
      color = "from-green-400 to-blue-500"
    } else {
      emoji = "💪"
      message = "Don't give up! Try again!"
      color = "from-pink-400 to-red-500"
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="quiz-card w-full max-w-lg overflow-hidden">
          <CardHeader className={`bg-gradient-to-r ${color} text-white text-center pb-8`}>
            <div className="text-8xl mb-4 emoji-bounce">{emoji}</div>
            <CardTitle className="text-3xl font-playful mb-2">{message}</CardTitle>
            <p className="text-xl opacity-90">Quiz Complete!</p>
          </CardHeader>
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {score}/{questions.length}
              </div>
              <div className="text-2xl font-semibold text-gray-700">{percentage}% Correct</div>
              <div className="flex justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {Math.floor((Date.now() - startTime.getTime()) / 1000)}s
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  {category?.name}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => router.push("/")}
                className="w-full h-14 rounded-2xl text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105"
              >
                <Zap className="w-5 h-5 mr-2" />
                Take Another Quiz! 🚀
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/leaderboard")}
                className="w-full h-14 rounded-2xl text-lg font-semibold border-2 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300 hover:scale-105"
              >
                <Trophy className="w-5 h-5 mr-2" />
                View Leaderboard 🏆
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{questionIcons[categoryId as keyof typeof questionIcons]}</div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{category?.name}</h1>
                <p className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                <Clock className="w-5 h-5 text-purple-500" />
                <span
                  className={`text-lg font-bold ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-gray-700"}`}
                >
                  {timeLeft}s
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-lg font-bold text-gray-700">{score}</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="progress-bar h-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white drop-shadow-lg">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="quiz-card mb-8 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white pb-8">
            <CardTitle className="text-2xl font-playful leading-relaxed">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid gap-4">
              {[
                { key: "A", text: currentQuestion.optionA },
                { key: "B", text: currentQuestion.optionB },
                { key: "C", text: currentQuestion.optionC },
                { key: "D", text: currentQuestion.optionD },
              ].map((option, index) => {
                let buttonClass = "answer-button"

                if (showFeedback) {
                  if (option.key === currentQuestion.correctAnswer) {
                    buttonClass +=
                      " bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-500 shadow-lg shadow-green-200"
                  } else if (option.key === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
                    buttonClass +=
                      " bg-gradient-to-r from-red-400 to-pink-500 text-white border-red-500 shadow-lg shadow-red-200"
                  }
                } else if (selectedAnswer === option.key) {
                  buttonClass += " selected"
                }

                return (
                  <Button
                    key={option.key}
                    variant="outline"
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(option.key)}
                    disabled={showFeedback}
                  >
                    <div className="flex items-center w-full">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {answerEmojis[index]}
                        </div>
                        <span className="text-lg font-medium">{option.text}</span>
                      </div>
                    </div>
                  </Button>
                )
              })}
            </div>

            {showFeedback && (
              <div className="mt-6 text-center">
                <div className={`text-6xl mb-4 emoji-bounce`}>{isCorrect ? "🎉" : "😅"}</div>
                <p className="text-xl font-playful text-gray-700">
                  {isCorrect ? "Awesome! That's correct! 🌟" : "Oops! Better luck next time! 💪"}
                </p>
              </div>
            )}

            {!showFeedback && (
              <div className="mt-8">
                <Button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className="w-full h-16 rounded-2xl text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {selectedAnswer ? (
                    <>
                      <CheckCircle className="w-6 h-6 mr-3" />
                      {currentQuestionIndex + 1 === questions.length ? "Finish Quiz! 🏁" : "Next Question! ➡️"}
                    </>
                  ) : (
                    <>
                      <span className="emoji-bounce mr-2">🤔</span>
                      Pick an answer first!
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}