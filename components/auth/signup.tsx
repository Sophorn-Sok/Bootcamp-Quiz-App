"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Users, GraduationCap, BookOpen, Settings } from "lucide-react"

export default function SignupComponent() {
  const [selectedRole, setSelectedRole] = useState<"user" | "admin" | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) return

    setLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
          username,
          role: selectedRole,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: data.success || "Account created successfully! Check your email to confirm your account.",
        })
        router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`)
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to create account",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!selectedRole) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="mb-4">
            <img src="/logo.png" alt="Hat Rean QuizApp Logo" className="w-20 h-20 rounded-2xl shadow-lg mx-auto" />
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Join Hat Rean QuizApp
          </h1>
          <p className="text-gray-600 mt-2">Choose your account type to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Student Signup Card */}
          <Card
            className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-purple-200 hover:border-purple-400"
            onClick={() => setSelectedRole("user")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-purple-700">Student Account</CardTitle>
              <CardDescription className="text-gray-600">Take quizzes and compete with others</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-500" />
                  <span>Access quizzes with teacher codes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span>View leaderboards and rankings</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-500" />
                  <span>Track your quiz progress</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90">
                Sign Up as Student
              </Button>
            </CardContent>
          </Card>

          {/* Teacher Signup Card */}
          <Card
            className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-pink-200 hover:border-pink-400"
            onClick={() => setSelectedRole("admin")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-pink-700">Teacher Account</CardTitle>
              <CardDescription className="text-gray-600">Create and manage quiz questions</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-pink-500" />
                  <span>Create custom quiz questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-pink-500" />
                  <span>Generate access codes for students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-pink-500" />
                  <span>Monitor student performance</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90">
                Sign Up as Teacher
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-pink-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-2xl border-0 rounded-3xl">
        <CardHeader className="flex flex-col items-center">
          <Button
            variant="ghost"
            onClick={() => setSelectedRole(null)}
            className="self-start mb-2 text-purple-600 hover:text-purple-800"
          >
            ← Back to role selection
          </Button>
          <div className="mb-4">
            <img src="/logo.png" alt="Hat Rean QuizApp Logo" className="w-20 h-20 rounded-2xl shadow-lg mx-auto" />
          </div>
          <CardTitle className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center">
            {selectedRole === "user" ? "Student" : "Teacher"} Account
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Create your {selectedRole === "user" ? "student" : "teacher"} account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <Label htmlFor="fullName" className="text-sm font-semibold text-purple-700">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="mt-2 bg-white/80 border border-purple-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 rounded-xl"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-purple-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 bg-white/80 border border-purple-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 rounded-xl"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <Label htmlFor="username" className="text-sm font-semibold text-purple-700">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-2 bg-white/80 border border-purple-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 rounded-xl"
                placeholder="Choose a username"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-semibold text-purple-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="mt-2 bg-white/80 border border-purple-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 rounded-xl"
                placeholder="Create a password"
              />
            </div>
            <Button
              type="submit"
              className={`w-full font-semibold rounded-xl py-2 shadow hover:opacity-90 transition ${
                selectedRole === "user"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500"
                  : "bg-gradient-to-r from-pink-500 to-purple-500"
              } text-white`}
              disabled={loading}
            >
              {loading ? "Creating account..." : `Create ${selectedRole === "user" ? "Student" : "Teacher"} Account`}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-pink-600 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
