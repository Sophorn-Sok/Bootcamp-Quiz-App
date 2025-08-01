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
import { useAuth } from "@/lib/auth-context"
import { mockCategories, mockQuestions, type Question } from "@/lib/mock-data"
import { Plus, BookOpen, Users } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function AdminPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  // Form states
  const [question, setQuestion] = useState("")
  const [optionA, setOptionA] = useState("")
  const [optionB, setOptionB] = useState("")
  const [optionC, setOptionC] = useState("")
  const [optionD, setOptionD] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (!user.isAdmin) {
      router.push("/")
      return
    }

    setLoading(false)
  }, [user, router])

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newQuestion: Question = {
        id: Date.now().toString(),
        categoryId: selectedCategory,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer: correctAnswer as "A" | "B" | "C" | "D",
        difficulty: difficulty as "easy" | "medium" | "hard",
      }

      mockQuestions.push(newQuestion)

      toast({
        title: "Success! 🎉",
        description: `Question added to ${mockCategories.find((c) => c.id === selectedCategory)?.name}. Total questions: ${mockQuestions.length}`,
      })

      // Reset form
      setQuestion("")
      setOptionA("")
      setOptionB("")
      setOptionC("")
      setOptionD("")
      setCorrectAnswer("")
      setSelectedCategory("")
      setDifficulty("medium")
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage quiz questions and categories</p>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add Content
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
                  <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
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
                {submitting ? "Adding Question..." : "Add Question"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
