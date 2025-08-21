"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { toast } from "@/hooks/use-toast"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        toast({
          title: "Success",
          description: "Logged in successfully!",
        })
        router.push("/user-dashboard")
      } else {
        toast({
          title: "Error",
          description: "Invalid username or password",
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
            <img
              src="/logo.png"
              alt="Hat Rean QuizApp Logo"
              className="w-20 h-20 rounded-2xl shadow-lg mx-auto"
            />
          </div>
          <CardTitle className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Login to access <span className="font-semibold text-purple-600">Hat Rean QuizApp</span>
          </CardDescription>
        </CardHeader>
        <CardContent>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-purple-700">Email</Label>
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
              <Label htmlFor="password" className="text-sm font-semibold text-purple-700">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 bg-white/80 border border-purple-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 rounded-xl"
                placeholder="Enter your password"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl py-2 shadow hover:opacity-90 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {"Don't have an account? "}
              <Link href="/auth/signup" className="text-pink-600 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}