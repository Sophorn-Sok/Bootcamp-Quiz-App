"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { LogOut, Trophy, Settings, Home } from "lucide-react"

// Custom Graduation Cap Icon Component
function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Graduation Cap */}
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        fill="url(#gradient)"
        stroke="white"
        strokeWidth="1"
      />
      {/* Tassel */}
      <path
        d="M12 12V16M12 16L10 18M12 16L14 18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Question mark in rectangle */}
      <rect x="8" y="8" width="8" height="6" rx="1" fill="white" opacity="0.9" />
      <text x="12" y="12" textAnchor="middle" fontSize="4" fill="url(#gradient)" fontWeight="bold">?</text>
      <line x1="10" y1="13.5" x2="14" y2="13.5" stroke="url(#gradient)" strokeWidth="0.5" />
      <line x1="10" y1="14.5" x2="14" y2="14.5" stroke="url(#gradient)" strokeWidth="0.5" />
      
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  )
}

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
                <GraduationCapIcon className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                  HAT REAN
                </span>
                <span className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                  QUIZAPP
                </span>
              </div>
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
