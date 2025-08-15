"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockQuizAttempts, type QuizAttempt } from "@/lib/mock-data"
import { Trophy, Medal, Clock, Zap, Star, Crown, Brain } from "lucide-react"

export default function DashboardPage() {
  const [leaderboard] = useState<QuizAttempt[]>(
    [...mockQuizAttempts].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      return a.timeTaken - b.timeTaken
    }),
  )
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUserSession()
  }, [])

  const checkUserSession = async () => {
    try {
      const response = await fetch("/api/auth/session")
      if (response.ok) {
        const data = await response.json()
        if (data.user) {
          setUser(data.user)
          // Redirect admins to admin dashboard
          if (data.user.user_metadata?.role === "admin") {
            router.push("/admin")
            return
          }
        } else {
          router.push("/auth/login")
          return
        }
      } else {
        router.push("/auth/login")
        return
      }
    } catch (error) {
      console.error("Session check failed:", error)
      router.push("/auth/login")
      return
    } finally {
      setIsLoading(false)
    }
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 1:
        return <Trophy className="w-6 h-6 text-gray-400" />
      case 2:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return (
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{index + 1}</span>
          </div>
        )
    }
  }

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return "🥇 Champion"
      case 1:
        return "🥈 Runner-up"
      case 2:
        return "🥉 Third Place"
      default:
        return `#${index + 1}`
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin mx-auto mb-4 flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg font-bold text-gray-600">Loading your quiz adventure... ✨</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/4 w-16 h-16 bg-yellow-300 rounded-full opacity-20 floating-element"></div>
          <div
            className="absolute top-10 right-1/4 w-12 h-12 bg-pink-300 rounded-full opacity-20 floating-element"
            style={{ animationDelay: "1s" }}
          ></div>

          <h1 className="text-5xl font-bold font-playful bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            🏆 Hall of Fame 🏆
          </h1>
          <p className="text-xl text-gray-600 font-medium">See who's crushing it in the quiz world! 🌟</p>
        </div>

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Second Place */}
            <Card className="quiz-card mt-8 order-1 md:order-1">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{leaderboard[1].username}</h3>
                <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white mb-3">🥈 Runner-up</Badge>
                <div className="text-2xl font-bold text-gray-700">
                  {leaderboard[1].score}/{leaderboard[1].totalQuestions}
                </div>
                <div className="text-lg text-gray-600">
                  {Math.round((leaderboard[1].score / leaderboard[1].totalQuestions) * 100)}%
                </div>
              </CardContent>
            </Card>

            {/* First Place */}
            <Card className="quiz-card border-4 border-yellow-300 shadow-2xl shadow-yellow-200 order-2 md:order-2">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center pulse-glow">
                  <Crown className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{leaderboard[0].username}</h3>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white mb-4 text-lg px-4 py-2">
                  👑 Champion
                </Badge>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {leaderboard[0].score}/{leaderboard[0].totalQuestions}
                </div>
                <div className="text-xl text-gray-600">
                  {Math.round((leaderboard[0].score / leaderboard[0].totalQuestions) * 100)}%
                </div>
              </CardContent>
            </Card>

            {/* Third Place */}
            <Card className="quiz-card mt-8 order-3 md:order-3">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Medal className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{leaderboard[2].username}</h3>
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white mb-3">🥉 Third Place</Badge>
                <div className="text-2xl font-bold text-gray-700">
                  {leaderboard[2].score}/{leaderboard[2].totalQuestions}
                </div>
                <div className="text-lg text-gray-600">
                  {Math.round((leaderboard[2].score / leaderboard[2].totalQuestions) * 100)}%
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Full Leaderboard */}
        <Card className="quiz-card">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className="flex items-center text-2xl font-playful">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                <Star className="w-6 h-6" />
              </div>
              Complete Rankings ⭐
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 p-6">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    index < 3
                      ? "bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-yellow-200 shadow-lg"
                      : "bg-white/80 backdrop-blur-sm border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="flex items-center space-x-6">
                    {getRankIcon(index)}
                    <div>
                      <div className="flex items-center space-x-3">
                        <div className="font-bold text-lg text-gray-800">{entry.username}</div>
                        <Badge variant="secondary" className="rounded-xl">
                          {getRankBadge(index)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center space-x-4 mt-1">
                        <span>{new Date(entry.completedAt).toLocaleDateString()}</span>
                        <Badge variant="outline" className="rounded-lg">
                          {entry.categoryName}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="font-bold text-2xl text-gray-800">
                        {entry.score}/{entry.totalQuestions}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center justify-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTime(entry.timeTaken)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                        {Math.round((entry.score / entry.totalQuestions) * 100)}%
                      </div>
                      <div className="flex items-center justify-center text-sm text-gray-600">
                        <Zap className="w-3 h-3 mr-1" />
                        Accuracy
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {leaderboard.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6">🏆</div>
                  <h3 className="text-2xl font-playful text-gray-600 mb-4">No scores yet!</h3>
                  <p className="text-gray-500">Be the first to take a quiz and claim the top spot! 🚀</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
