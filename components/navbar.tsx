"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { LogOut, Trophy, Settings, Home, Sparkles } from "lucide-react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg shadow-purple-100/50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center floating-element">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-playful bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                QuizMaster ✨
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Link href="/">
                  <Button variant="ghost" size="sm" className="rounded-xl hover:bg-purple-50">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button variant="ghost" size="sm" className="rounded-xl hover:bg-purple-50">
                    <Trophy className="w-4 h-4 mr-2" />
                    Leaderboard
                  </Button>
                </Link>
                {user.isAdmin && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm" className="rounded-xl hover:bg-purple-50">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl px-4 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{user.fullName.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Hi, {user.fullName}! 👋</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="rounded-xl border-2 hover:bg-red-50 hover:border-red-200 bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="rounded-xl border-2 bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    size="sm"
                    className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Sign Up ✨
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
