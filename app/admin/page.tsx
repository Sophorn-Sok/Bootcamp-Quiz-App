"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { mockCategories, mockQuestions, type Question } from "@/lib/mock-data"
import { Plus, Search, Eye, Edit, Trash2, Calendar, MessageSquare, Settings, BookOpen, Users, ArrowLeft } from "lucide-react"

export default function AdminPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [showQuestionManagement, setShowQuestionManagement] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)

  // Form states
  const [question, setQuestion] = useState("")
  const [optionA, setOptionA] = useState("")
  const [optionB, setOptionB] = useState("")
  const [optionC, setOptionC] = useState("")
  const [optionD, setOptionD] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (user.user_metadata.role !== 'admin') {
      router.push("/")
      return
    }

    setQuestions(mockQuestions)
    setFilteredQuestions(mockQuestions)
    setLoading(false)
  }, [user, router])

  useEffect(() => {
    let filtered = questions

    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(q => q.categoryId === selectedCategory)
    }

    if (selectedDifficulty && selectedDifficulty !== "all") {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty)
    }

    setFilteredQuestions(filtered)
  }, [questions, searchTerm, selectedCategory, selectedDifficulty])

  const handleViewQuestion = (question: Question) => {
    setSelectedQuestion(question)
  }

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question)
    setQuestion(question.question)
    setOptionA(question.optionA)
    setOptionB(question.optionB)
    setOptionC(question.optionC)
    setOptionD(question.optionD)
    setCorrectAnswer(question.correctAnswer)
    setCategoryId(question.categoryId)
    setDifficulty(question.difficulty)
    setShowAddForm(true)
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (confirm("Are you sure you want to delete this question?")) {
      const updatedQuestions = questions.filter(q => q.id !== questionId)
      setQuestions(updatedQuestions)
      mockQuestions.splice(mockQuestions.findIndex(q => q.id === questionId), 1)
      
      alert("Question deleted successfully!")
    }
  }

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (editingQuestion) {
        // Update existing question
        const updatedQuestion: Question = {
          ...editingQuestion,
          categoryId,
          question,
          optionA,
          optionB,
          optionC,
          optionD,
          correctAnswer: correctAnswer as "A" | "B" | "C" | "D",
          difficulty: difficulty as "easy" | "medium" | "hard",
        }

        const updatedQuestions = questions.map(q => 
          q.id === editingQuestion.id ? updatedQuestion : q
        )
        setQuestions(updatedQuestions)
        
        const mockIndex = mockQuestions.findIndex(q => q.id === editingQuestion.id)
        if (mockIndex !== -1) {
          mockQuestions[mockIndex] = updatedQuestion
        }

        alert("Question updated successfully!")
      } else {
        // Add new question
        const newQuestion: Question = {
          id: Date.now().toString(),
          categoryId,
          question,
          optionA,
          optionB,
          optionC,
          optionD,
          correctAnswer: correctAnswer as "A" | "B" | "C" | "D",
          difficulty: difficulty as "easy" | "medium" | "hard",
        }

        const updatedQuestions = [...questions, newQuestion]
        setQuestions(updatedQuestions)
        mockQuestions.push(newQuestion)

        alert(`Question added to ${mockCategories.find((c) => c.id === categoryId)?.name}. Total questions: ${updatedQuestions.length}`)
      }

      // Reset form
      resetForm()
    } catch (error) {
      alert("An unexpected error occurred")
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setQuestion("")
    setOptionA("")
    setOptionB("")
    setOptionC("")
    setOptionD("")
    setCorrectAnswer("")
    setCategoryId("")
    setDifficulty("medium")
    setEditingQuestion(null)
    setShowAddForm(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "hard": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryName = (categoryId: string) => {
    return mockCategories.find(c => c.id === categoryId)?.name || "Unknown"
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'numeric', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin mx-auto mb-4 flex items-center justify-center">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg font-bold text-gray-600">Loading admin dashboard... ✨</p>
        </div>
      </div>
    )
  }

    if (!user || user.user_metadata.role !== 'admin') {
    return null
  }

  // Show Question Management Interface
  if (showQuestionManagement) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-screen">
          {/* Left Panel - Question Management */}
          <div className="flex-1 flex flex-col p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Questions</h1>
                  <p className="text-gray-600">{filteredQuestions.length} questions found</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowQuestionManagement(false)}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex items-center space-x-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
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

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New question
              </Button>
            </div>

            {/* Questions List */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {filteredQuestions.map((q) => (
                <Card key={q.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{q.question}</h3>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {getCategoryName(q.categoryId)}
                          </Badge>
                          <Badge className={`text-xs ${getDifficultyColor(q.difficulty)}`}>
                            {q.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            active
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            Updated {formatDate(new Date())}
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            4 answers
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewQuestion(q)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditQuestion(q)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="text-red-600 hover:text-red-700"
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

          {/* Right Panel - Details View */}
          <div className="w-96 bg-white border-l border-gray-200 p-6">
            {selectedQuestion ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Question Details</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedQuestion(null)}
                  >
                    ×
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Question</Label>
                    <p className="mt-1 text-gray-900">{selectedQuestion.question}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Category</Label>
                    <Badge variant="outline" className="mt-1">
                      {getCategoryName(selectedQuestion.categoryId)}
                    </Badge>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Difficulty</Label>
                    <Badge className={`mt-1 ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                      {selectedQuestion.difficulty}
                    </Badge>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Options</Label>
                    <div className="mt-2 space-y-2">
                      <div className={`p-2 rounded ${selectedQuestion.correctAnswer === 'A' ? 'bg-green-100 border-green-300' : 'bg-gray-50'}`}>
                        <span className="font-medium">A:</span> {selectedQuestion.optionA}
                        {selectedQuestion.correctAnswer === 'A' && <span className="ml-2 text-green-600">✓ Correct</span>}
                      </div>
                      <div className={`p-2 rounded ${selectedQuestion.correctAnswer === 'B' ? 'bg-green-100 border-green-300' : 'bg-gray-50'}`}>
                        <span className="font-medium">B:</span> {selectedQuestion.optionB}
                        {selectedQuestion.correctAnswer === 'B' && <span className="ml-2 text-green-600">✓ Correct</span>}
                      </div>
                      <div className={`p-2 rounded ${selectedQuestion.correctAnswer === 'C' ? 'bg-green-100 border-green-300' : 'bg-gray-50'}`}>
                        <span className="font-medium">C:</span> {selectedQuestion.optionC}
                        {selectedQuestion.correctAnswer === 'C' && <span className="ml-2 text-green-600">✓ Correct</span>}
                      </div>
                      <div className={`p-2 rounded ${selectedQuestion.correctAnswer === 'D' ? 'bg-green-100 border-green-300' : 'bg-gray-50'}`}>
                        <span className="font-medium">D:</span> {selectedQuestion.optionD}
                        {selectedQuestion.correctAnswer === 'D' && <span className="ml-2 text-green-600">✓ Correct</span>}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={() => handleEditQuestion(selectedQuestion)}
                      className="w-full"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Question
                    </Button>
                  </div>
                </div>
              </div>
            ) : showAddForm ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingQuestion ? 'Edit Question' : 'Add New Question'}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetForm}
                  >
                    ×
                  </Button>
                </div>

                <form onSubmit={handleSubmitQuestion} className="space-y-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={categoryId} onValueChange={setCategoryId} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="question">Question</Label>
                    <Textarea
                      id="question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Enter your question here..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="optionA">Option A</Label>
                      <Input 
                        id="optionA" 
                        value={optionA} 
                        onChange={(e) => setOptionA(e.target.value)} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="optionB">Option B</Label>
                      <Input 
                        id="optionB" 
                        value={optionB} 
                        onChange={(e) => setOptionB(e.target.value)} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="optionC">Option C</Label>
                      <Input 
                        id="optionC" 
                        value={optionC} 
                        onChange={(e) => setOptionC(e.target.value)} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="optionD">Option D</Label>
                      <Input 
                        id="optionD" 
                        value={optionD} 
                        onChange={(e) => setOptionD(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="correctAnswer">Correct Answer</Label>
                    <Select value={correctAnswer} onValueChange={setCorrectAnswer} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit" disabled={submitting} className="flex-1">
                      {submitting ? "Saving..." : (editingQuestion ? "Update Question" : "Add Question")}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Eye className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500">Select a question to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Show Main Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage quiz questions and categories</p>
        </div>

        <div className="text-center mb-8 flex justify-center space-x-4">
          <Button 
            onClick={() => setShowQuestionManagement(true)}
            className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3"
          >
            Manage Questions
          </Button>
          <Button 
            onClick={() => router.push("/leaderboard")}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
          >
            View Leaderboard
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Total Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">{mockQuestions.length}</p>
              <p className="text-xs text-gray-500 mt-1">Across all categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{mockCategories.length}</p>
              <p className="text-xs text-gray-500 mt-1">Across all categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add Contents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Create new questions below</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">📝 Quick Test Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
            <li>Fill out the form below to create a new question</li>
            <li>Select a category (try "General Knowledge")</li>
            <li>Add your question and 4 answer options</li>
            <li>Mark the correct answer</li>
            <li>Click "Add Question" and see the success message</li>
            <li>Go take a quiz to see your new question appear!</li>
          </ol>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add New Question</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitQuestion} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={categoryId} onValueChange={setCategoryId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter your question here..."
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="optionA">Option A</Label>
                  <Input id="optionA" value={optionA} onChange={(e) => setOptionA(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="optionB">Option B</Label>
                  <Input id="optionB" value={optionB} onChange={(e) => setOptionB(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="optionC">Option C</Label>
                  <Input id="optionC" value={optionC} onChange={(e) => setOptionC(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="optionD">Option D</Label>
                  <Input id="optionD" value={optionD} onChange={(e) => setOptionD(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="correctAnswer">Correct Answer</Label>
                <Select value={correctAnswer} onValueChange={setCorrectAnswer} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select correct answer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Adding Question..." : "Post Questions"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
