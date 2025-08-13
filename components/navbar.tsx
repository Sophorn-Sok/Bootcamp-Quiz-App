"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
<<<<<<< HEAD
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { LogOut, Trophy, Settings, Home, Sparkles, Menu, X, User, Camera, Edit3, X as XIcon } from "lucide-react"
import { useImageUpload } from "@/hooks/use-image-upload"
=======
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
>>>>>>> ab2bad00c0ba75be3e9f1cc1bdf49e751b7031bb

export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()
<<<<<<< HEAD
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  const {
    imageUrl,
    isUploading,
    fileInputRef,
    handleImageUpload,
    triggerFileInput,
    removeImage
  } = useImageUpload()
=======
>>>>>>> ab2bad00c0ba75be3e9f1cc1bdf49e751b7031bb

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
<<<<<<< HEAD
    setIsMobileMenuOpen(false)
    setIsProfileDropdownOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

  const handleProfileClick = () => {
    toggleProfileDropdown()
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg shadow-purple-100/50 border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center floating-element rounded-2xl overflow-hidden">
                {/* Logo Image */}
                <img 
                  src="/logo.png"
                  alt="HAT REAN QUIZAPP Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Text - Aligned to match reference */}
              <div className="flex flex-col justify-center">
                <span className="text-2xl sm:text-3xl font-black text-purple-600 leading-none tracking-wide">
                  HAT REAN
                </span>
                <span className="text-base sm:text-lg font-bold text-purple-500 leading-none tracking-wide mt-0.5">
=======
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
>>>>>>> ab2bad00c0ba75be3e9f1cc1bdf49e751b7031bb
                  QUIZAPP
                </span>
              </div>
            </Link>
          </div>

<<<<<<< HEAD
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {user ? (
              <>
                <Link href="/">
                  <Button variant="ghost" size="sm" className="rounded-xl hover:bg-purple-50 text-sm lg:text-base">
                    <Home className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Home</span>
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button variant="ghost" size="sm" className="rounded-xl hover:bg-purple-50 text-sm lg:text-base">
                    <Trophy className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Leaderboard</span>
=======
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
>>>>>>> ab2bad00c0ba75be3e9f1cc1bdf49e751b7031bb
                  </Button>
                </Link>
                {user.isAdmin && (
                  <Link href="/admin">
<<<<<<< HEAD
                    <Button variant="ghost" size="sm" className="rounded-xl hover:bg-purple-50 text-sm lg:text-base">
                      <Settings className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Admin</span>
                    </Button>
                  </Link>
                )}
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleProfileClick}
                    className="flex items-center space-x-2 lg:space-x-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl px-3 lg:px-4 py-2 hover:from-purple-200 hover:to-pink-200 transition-all duration-200"
                  >
                    <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center overflow-hidden">
                      {imageUrl ? (
                        <img 
                          src={imageUrl} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-xs lg:text-sm">{user.fullName.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <span className="text-xs lg:text-sm font-medium text-gray-700 hidden lg:inline">Hi, {user.fullName}! 👋</span>
                    <span className="text-xs font-medium text-gray-700 lg:hidden">Hi! 👋</span>
                  </Button>

                  {/* Profile Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden z-50">
                      <div className="p-6">
                        {/* Profile Header */}
                        <div className="text-center mb-6">
                          <div className="relative inline-block">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden">
                              {imageUrl ? (
                                <img 
                                  src={imageUrl} 
                                  alt="Profile" 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-white font-bold text-2xl">{user.fullName.charAt(0).toUpperCase()}</span>
                              )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 flex space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={triggerFileInput}
                                disabled={isUploading}
                                className="w-8 h-8 rounded-full p-0 bg-white border-2 border-purple-200 hover:border-purple-300"
                              >
                                {isUploading ? (
                                  <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Camera className="w-4 h-4 text-purple-600" />
                                )}
                              </Button>
                              {imageUrl && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={removeImage}
                                  className="w-8 h-8 rounded-full p-0 bg-white border-2 border-red-200 hover:border-red-300"
                                >
                                  <XIcon className="w-3 h-3 text-red-600" />
                                </Button>
                              )}
                            </div>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </div>
                          <h3 className="text-lg font-bold text-gray-800">{user.fullName}</h3>
                          <p className="text-sm text-gray-600">@{user.username}</p>
                          {user.isAdmin && (
                            <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                              Admin
                            </span>
                          )}
                        </div>

                        {/* Profile Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 bg-purple-50 rounded-xl">
                            <div className="text-2xl font-bold text-purple-600">0</div>
                            <div className="text-xs text-gray-600">Quizzes Taken</div>
                          </div>
                          <div className="text-center p-3 bg-pink-50 rounded-xl">
                            <div className="text-2xl font-bold text-pink-600">0</div>
                            <div className="text-xs text-gray-600">Average Score</div>
                          </div>
                        </div>

                        {/* Profile Actions */}
                        <div className="space-y-2">
                          <Link href="/profile" onClick={() => setIsProfileDropdownOpen(false)}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-left hover:bg-purple-50 rounded-xl"
                            >
                              <User className="w-4 h-4 mr-3 text-purple-600" />
                              View Profile
                            </Button>
                          </Link>
                          <Link href="/profile" onClick={() => setIsProfileDropdownOpen(false)}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-left hover:bg-purple-50 rounded-xl"
                            >
                              <Edit3 className="w-4 h-4 mr-3 text-purple-600" />
                              Edit Profile
                            </Button>
                          </Link>
                          <Link href="/achievements" onClick={() => setIsProfileDropdownOpen(false)}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-left hover:bg-purple-50 rounded-xl"
                            >
                              <Trophy className="w-4 h-4 mr-3 text-purple-600" />
                              My Achievements
                            </Button>
                          </Link>
                        </div>

                        {/* Logout Button */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="w-full rounded-xl border-2 hover:bg-red-50 hover:border-red-200 bg-transparent"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Logout
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
=======
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
>>>>>>> ab2bad00c0ba75be3e9f1cc1bdf49e751b7031bb
              </>
            ) : (
              <>
                <Link href="/auth/login">
<<<<<<< HEAD
                  <Button variant="outline" size="sm" className="rounded-xl border-2 bg-transparent text-sm lg:text-base">
=======
                  <Button variant="outline" size="sm" className="rounded-xl border-2 bg-transparent">
>>>>>>> ab2bad00c0ba75be3e9f1cc1bdf49e751b7031bb
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    size="sm"
<<<<<<< HEAD
                    className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-sm lg:text-base"
=======
                    className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
>>>>>>> ab2bad00c0ba75be3e9f1cc1bdf49e751b7031bb
                  >
                    Sign Up ✨
                  </Button>
                </Link>
              </>
            )}
          </div>
<<<<<<< HEAD

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="rounded-xl hover:bg-purple-50"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-purple-100 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start rounded-xl hover:bg-purple-50">
                      <Home className="w-4 h-4 mr-3" />
                      Home
                    </Button>
                  </Link>
                  <Link href="/leaderboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start rounded-xl hover:bg-purple-50">
                      <Trophy className="w-4 h-4 mr-3" />
                      Leaderboard
                    </Button>
                  </Link>
                  {user.isAdmin && (
                    <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start rounded-xl hover:bg-purple-50">
                        <Settings className="w-4 h-4 mr-3" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  
                  {/* Mobile Profile Section */}
                  <div className="border-t border-purple-100 pt-3 mt-3">
                    <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl px-4 py-3 mx-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center overflow-hidden">
                        {imageUrl ? (
                          <img 
                            src={imageUrl} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white font-bold text-sm">{user.fullName.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">{user.fullName}</div>
                        <div className="text-xs text-gray-600">@{user.username}</div>
                      </div>
                    </div>
                    
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start rounded-xl hover:bg-purple-50"
                      >
                        <User className="w-4 h-4 mr-3" />
                        View Profile
                      </Button>
                    </Link>
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start rounded-xl hover:bg-purple-50"
                      >
                        <Edit3 className="w-4 h-4 mr-3" />
                        Edit Profile
                      </Button>
                    </Link>
                    <Link href="/achievements" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start rounded-xl hover:bg-purple-50"
                      >
                        <Trophy className="w-4 h-4 mr-3" />
                        My Achievements
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full rounded-xl border-2 hover:bg-red-50 hover:border-red-200 bg-transparent"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-xl border-2 bg-transparent">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Sign Up ✨
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for profile dropdown */}
      {isProfileDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileDropdownOpen(false)}
        />
      )}
    </nav>
  )
}
=======
        </div>
      </div>
    </nav>
  )
}
>>>>>>> ab2bad00c0ba75be3e9f1cc1bdf49e751b7031bb
