"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  BookOpen, 
  Brain, 
  Award, 
  Home,
  TrendingUp,
  CheckCircle,
  Clock
} from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: 'quiz' | 'streak' | 'score' | 'special'
  earned: boolean
  earnedDate?: string
  progress: number
  maxProgress: number
}

export default function AchievementsPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first quiz',
      icon: <BookOpen className="w-6 h-6" />,
      category: 'quiz',
      earned: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: '2',
      title: 'Hat Rean',
      description: 'Complete 10 quizzes',
      icon: <Trophy className="w-6 h-6" />,
      category: 'quiz',
      earned: false,
      progress: 0,
      maxProgress: 10
    },
    {
      id: '3',
      title: 'Perfect Score',
      description: 'Get 100% on any quiz',
      icon: <Star className="w-6 h-6" />,
      category: 'score',
      earned: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: '4',
      title: 'Streak Master',
      description: 'Take quizzes for 7 days in a row',
      icon: <Zap className="w-6 h-6" />,
      category: 'streak',
      earned: false,
      progress: 0,
      maxProgress: 7
    },
    {
      id: '5',
      title: 'Speed Demon',
      description: 'Complete a quiz in under 2 minutes',
      icon: <Clock className="w-6 h-6" />,
      category: 'special',
      earned: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: '6',
      title: 'Category Explorer',
      description: 'Try quizzes from 5 different categories',
      icon: <Target className="w-6 h-6" />,
      category: 'quiz',
      earned: false,
      progress: 0,
      maxProgress: 5
    },
    {
      id: '7',
      title: 'High Achiever',
      description: 'Maintain an average score above 90%',
      icon: <TrendingUp className="w-6 h-6" />,
      category: 'score',
      earned: false,
      progress: 0,
      maxProgress: 90
    },
    {
      id: '8',
      title: 'Early Bird',
      description: 'Complete a quiz before 8 AM',
      icon: <Brain className="w-6 h-6" />,
      category: 'special',
      earned: false,
      progress: 0,
      maxProgress: 1
    }
  ])

  if (!user) {
    router.push("/auth/login")
    return null
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'quiz': return 'from-blue-500 to-blue-600'
      case 'streak': return 'from-orange-500 to-orange-600'
      case 'score': return 'from-green-500 to-green-600'
      case 'special': return 'from-purple-500 to-purple-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'quiz': return <BookOpen className="w-4 h-4" />
      case 'streak': return <Zap className="w-4 h-4" />
      case 'score': return <Star className="w-4 h-4" />
      case 'special': return <Award className="w-4 h-4" />
      default: return <Trophy className="w-4 h-4" />
    }
  }

  const earnedAchievements = achievements.filter(a => a.earned)
  const availableAchievements = achievements.filter(a => !a.earned)
  const completionRate = Math.round((earnedAchievements.length / achievements.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            My Achievements
          </h1>
          <p className="text-gray-600">Track your progress and unlock new badges</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-purple-600">{earnedAchievements.length}</div>
              <div className="text-sm text-gray-600">Earned</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-pink-600">{availableAchievements.length}</div>
              <div className="text-sm text-gray-600">Available</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-blue-600">{achievements.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-green-600">{completionRate}%</div>
              <div className="text-sm text-gray-600">Completion</div>
            </CardContent>
          </Card>
        </div>

        {/* Earned Achievements */}
        {earnedAchievements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
              Earned Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedAchievements.map((achievement) => (
                <Card key={achievement.id} className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(achievement.category)} rounded-full flex items-center justify-center text-white`}>
                        {achievement.icon}
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Earned
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-bold text-gray-800 mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    {achievement.earnedDate && (
                      <p className="text-xs text-gray-500">Earned: {achievement.earnedDate}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Achievements */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-blue-600" />
            Available Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableAchievements.map((achievement) => (
              <Card key={achievement.id} className="bg-white/80 backdrop-blur-sm border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(achievement.category)} rounded-full flex items-center justify-center text-white opacity-60`}>
                      {achievement.icon}
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-bold text-gray-800 mb-1">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Motivation Message */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <Trophy className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Keep Learning!</h3>
              <p className="text-gray-600 mb-4">
                You're making great progress! Complete more quizzes to unlock new achievements and track your learning journey.
              </p>
              <Button onClick={() => router.push('/')} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Home className="w-4 h-4 mr-2" />
                Take More Quizzes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 
