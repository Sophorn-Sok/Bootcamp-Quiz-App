"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { toast } from "@/hooks/use-toast"

export default function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const success = await signup(email, password, fullName)
      if (success) {
        toast({
          title: "Success",
          description: "Account created! Please check your email to verify your account.",
        })
        router.push("/auth/login")
      } else {
        toast({
          title: "Error",
          description: "Failed to create account",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4">
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-3xl">
        <CardHeader className="flex flex-col items-center">
          <div className="mb-4">
            <img src="/logo.png" alt="Hat Rean QuizApp Logo" className="w-20 h-20 rounded-2xl shadow-lg mx-auto" />
          </div>
          <CardTitle className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center">
            Create Account
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Join <span className="font-semibold text-purple-600">Hat Rean QuizApp</span> and start your journey!
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
                placeholder="Enter your email"
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
                placeholder="Enter your password"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl py-2 shadow hover:opacity-90 transition"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
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