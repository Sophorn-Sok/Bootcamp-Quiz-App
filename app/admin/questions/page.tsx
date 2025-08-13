"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { mockCategories, mockQuestions, type Question } from "@/lib/mock-data"
import { Plus, Search, Eye, Edit, Trash2, X, CheckCircle, Circle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface QuestionWithCategory extends Question {
  categoryName: string
  status: 'active' | 'draft'
  description?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
}

export default function ManageQuestionsPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [questions, setQuestions] = useState<QuestionWithCategory[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionWithCategory | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (!user.isAdmin) {
      router.push("/")
      return
    }

    const questionsWithData: QuestionWithCategory[] = mockQuestions.map(q => ({
      ...q,
      categoryName: mockCategories.find(c => c.id === q.categoryId)?.name || "Unknown",
      status: Math.random() > 0.2 ? 'active' : 'draft' as 'active' | 'draft',
      description: `This question tests knowledge about ${mockCategories.find(c => c.id === q.categoryId)?.name.toLowerCase()}.`,
      tags: getTagsForCategory(q.categoryId),
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdBy: "Admin User"
    }))

    setQuestions(questionsWithData)
    setLoading(false)
  }, [user, router])

  const getTagsForCategory = (categoryId: string): string[] => {
    const tagMap: { [key: string]: string[] } = {
      "1": ["general", "knowledge", "trivia"],
      "2": ["science", "physics", "chemistry", "biology"],
      "3": ["history", "world-war", "politics"],
      "4": ["sports", "basketball", "football", "fifa"],
      "5": ["technology", "programming", "computers", "html"]
    }
    return tagMap[categoryId] || []
  }

  const filteredQuestions = questions.filter(q => {
    if (searchTerm && !q.question.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (categoryFilter && categoryFilter !== "all" && q.categoryId !== categoryFilter) return false
    if (difficultyFilter && difficultyFilter !== "all" && q.difficulty !== difficultyFilter) return false
    return true
  })

  const handleEditQuestion = (question: QuestionWithCategory) => {
    setSelectedQuestion(question)
    setIsEditing(true)
  }

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      const updatedQuestions = questions.filter(q => q.id !== questionId)
      setQuestions(updatedQuestions)
      setSelectedQuestion(null)

      toast({
        title: "Deleted!",
        description: "Question has been removed",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete question",
        variant: "destructive",
      })
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Questions</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
                         <Select value={categoryFilter} onValueChange={setCategoryFilter}>
               <SelectTrigger className="w-32">
                 <SelectValue placeholder="Category" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">All Categories</SelectItem>
                 {mockCategories.map((category) => (
                   <SelectItem key={category.id} value={category.id}>
                     {category.name}
                   </SelectItem>
                 ))}
               </SelectContent>
             </Select>
             <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
               <SelectTrigger className="w-32">
                 <SelectValue placeholder="Difficulty" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">All Difficulties</SelectItem>
                 <SelectItem value="easy">Easy</SelectItem>
                 <SelectItem value="medium">Medium</SelectItem>
                 <SelectItem value="hard">Hard</SelectItem>
               </SelectContent>
             </Select>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              New Question
            </Button>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {filteredQuestions.length} questions found
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Panel - Questions List */}
        <div className="w-1/2 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Questions</h2>
            <div className="space-y-3">
              {filteredQuestions.map((question) => (
                <Card
                  key={question.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedQuestion?.id === question.id ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onClick={() => setSelectedQuestion(question)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                          {question.question}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {question.categoryName}
                          </Badge>
                          <Badge className={`text-xs ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(question.status)}`}>
                            {question.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Updated {new Date(question.updatedAt).toLocaleDateString()}</span>
                          <span>4 answers</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedQuestion(question)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditQuestion(question)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteQuestion(question.id)
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Question Details */}
        <div className="w-1/2 bg-white">
          {selectedQuestion ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Question Details</h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditQuestion(selectedQuestion)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteQuestion(selectedQuestion.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedQuestion(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">{selectedQuestion.question}</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge variant="secondary">{selectedQuestion.categoryName}</Badge>
                    <Badge className={getDifficultyColor(selectedQuestion.difficulty)}>
                      {selectedQuestion.difficulty}
                    </Badge>
                    <Badge className={getStatusColor(selectedQuestion.status)}>
                      {selectedQuestion.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{selectedQuestion.description}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Answer Options:</h4>
                  <div className="space-y-2">
                    {[
                      { key: 'A', text: selectedQuestion.optionA },
                      { key: 'B', text: selectedQuestion.optionB },
                      { key: 'C', text: selectedQuestion.optionC },
                      { key: 'D', text: selectedQuestion.optionD }
                    ].map((option) => (
                      <div
                        key={option.key}
                        className={`flex items-center p-3 rounded-lg border ${
                          option.key === selectedQuestion.correctAnswer
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        {option.key === selectedQuestion.correctAnswer ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 mr-3" />
                        )}
                        <span className="font-medium mr-2">{option.key}.</span>
                        <span>{option.text}</span>
                        {option.key === selectedQuestion.correctAnswer && (
                          <Badge className="ml-auto bg-green-100 text-green-800">Correct</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuestion.tags?.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div>Created: {new Date(selectedQuestion.createdAt).toLocaleString()}</div>
                  <div>Last Updated: {new Date(selectedQuestion.updatedAt).toLocaleString()}</div>
                  <div>Created By: {selectedQuestion.createdBy}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select a question to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 