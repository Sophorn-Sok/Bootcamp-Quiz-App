"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaGamepad, FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import { useAuth } from "@/lib/auth-context"

export default function SignIn() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(username, password)
      if (success) {
        router.push("/")
      } else {
        setError("Invalid username or password. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (demoUsername: string) => {
    setIsLoading(true)
    setError("")

    try {
      const success = await login(demoUsername, "password")
      if (success) {
        router.push("/")
      } else {
        setError("Demo login failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 px-4">
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-lg p-10 border border-gray-200">
        <div className="flex flex-col items-center text-center">
          {/* Icon header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-full text-white mb-4">
            <FaGamepad className="text-3xl" />
          </div>

          <h1 className="text-3xl font-bold text-purple-700 mb-1">Welcome Back! 👋</h1>
          <p className="text-base text-gray-500 mb-6">Sign in to continue your quiz journey</p>

          {/* Demo accounts box */}
          <div className="bg-blue-50 p-4 rounded-md text-sm w-full mb-8 border border-blue-100">
            <div className="flex items-center gap-2 mb-2 font-semibold text-blue-600">
              <FaGamepad />
              Demo Accounts:
            </div>
            <div className="space-y-2">
              <button
                onClick={() => handleDemoLogin("admin")}
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <strong>Admin:</strong> admin / password
              </button>
              <button
                onClick={() => handleDemoLogin("john_doe")}
                disabled={isLoading}
                className="w-full bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <strong>User:</strong> john_doe / password
              </button>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border rounded-xl px-4 py-3">
            <FaUser className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full focus:outline-none text-sm"
              required
            />
          </div>
          <div className="flex items-center border rounded-xl px-4 py-3">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full focus:outline-none text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In ✨"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-purple-600 font-medium hover:underline">
            Sign up here! 🚀
          </a>
        </p>
      </div>
    </div>
  )
}

