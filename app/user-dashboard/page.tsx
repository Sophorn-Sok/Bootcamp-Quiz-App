"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/lib/auth-context"
import { Play, BookOpen, Clock, Trophy, Brain, Zap, Target, Star } from "lucide-react"

interface Category {
  id: string;
  name: string;
  description: string;
}

const categoryIcons = {
  "1": "🌍", // General Knowledge
  "2": "🔬", // Science
  "3": "🏛️", // History
  "4": "⚽", // Sports
  "5": "💻", // Technology
}

const categoryColors = {
  "1": "from-green-400 to-emerald-500",
  "2": "from-blue-400 to-cyan-500",
  "3": "from-amber-400 to-orange-500",
  "4": "from-red-400 to-pink-500",
  "5": "from-purple-400 to-indigo-500",
}

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const supabase = createClient()
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    // Reset selected category when the page is loaded or shown
    // This helps when the user navigates back from a quiz.
    setSelectedCategory("");
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*')
      if (error) {
        console.error('Error fetching categories:', error)
      } else {
        setCategories(data || [])
      }
    }
    fetchCategories()
  }, [supabase])

  const startQuiz = () => {
    if (selectedCategory) {
      router.push(`/quiz/${selectedCategory}`)
    }
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
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/4 w-20 h-20 bg-yellow-300 rounded-full opacity-20 floating-element"></div>
          <div
            className="absolute top-10 right-1/4 w-16 h-16 bg-pink-300 rounded-full opacity-20 floating-element"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-0 left-1/3 w-12 h-12 bg-blue-300 rounded-full opacity-20 floating-element"
            style={{ animationDelay: "2s" }}
          ></div>

          <h1 className="text-6xl font-bold font-playful bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Ready to Quiz? 🚀
          </h1>
          <p className="text-2xl text-gray-600 mb-8 font-medium">
            Test your knowledge and have fun while learning! 🧠✨
          </p>

          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-3 mx-auto pulse-glow">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-600">Lightning Fast</p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mb-3 mx-auto pulse-glow"
                style={{ animationDelay: "0.5s" }}
              >
                <Target className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-600">Super Accurate</p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mb-3 mx-auto pulse-glow"
                style={{ animationDelay: "1s" }}
              >
                <Star className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-600">Mega Fun</p>
            </div>
          </div>
        </div>

        {user && user.user_metadata.role === 'admin' && (
          <div className="text-center mb-8">
            <Button
              onClick={() => router.push("/admin")}
              className="h-12 px-8 text-lg font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              Go to Admin Dashboard
            </Button>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Quiz Starter */}
          <Card className="quiz-card border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white pb-8">
              <CardTitle className="flex items-center text-2xl font-playful">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                  <Play className="w-6 h-6" />
                </div>
                Start Your Quiz Adventure! 🎯
              </CardTitle>
              <CardDescription className="text-purple-100 text-lg">
                Pick a category and let's see what you know!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div>
                <label className="text-lg font-semibold mb-4 block text-gray-700">Choose Your Challenge 🎲</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-14 rounded-2xl border-2 text-lg font-medium">
                    <SelectValue placeholder="4" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()} className="text-lg p-4 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{categoryIcons[category.id as keyof typeof categoryIcons]}</span>
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={startQuiz}
                disabled={!selectedCategory}
                className="w-full h-16 rounded-2xl text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {selectedCategory ? (
                  <>
                    <Play className="w-6 h-6 mr-3" />
                    Let's Go! 🚀
                  </>
                ) : (
                  <>
                    <span className="emoji-bounce mr-2">🤔</span>
                    Pick a category first!
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Features & Info */}
          <div className="space-y-6">
            <Card className="quiz-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl font-playful text-gray-800">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center mr-3">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  Leaderboard 🏆
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 text-lg">Compete with friends and climb to the top! 📈</p>
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-2xl border-2 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300 hover:scale-105 bg-transparent"
                  onClick={() => router.push("/leaderboard")}
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  View Rankings ✨
                </Button>
              </CardContent>
            </Card>

            <Card className="quiz-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl font-playful text-gray-800">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center mr-3">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  Quiz Features 🎮
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center text-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-lg flex items-center justify-center mr-3">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    Timed challenges ⏰
                  </li>
                  <li className="flex items-center text-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm">🎲</span>
                    </div>
                    Randomized questions
                  </li>
                  <li className="flex items-center text-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm">📊</span>
                    </div>
                    Track your progress
                  </li>
                  <li className="flex items-center text-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm">🏅</span>
                    </div>
                    Earn achievements
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Category Preview */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold font-playful text-center mb-8 text-gray-800">Explore Categories 🗂️</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="quiz-card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => {
                  setSelectedCategory(category.id)
                  startQuiz()
                }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${categoryColors[String(category.id) as keyof typeof categoryColors]} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <span className="text-3xl">{categoryIcons[category.id as keyof typeof categoryIcons]}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
