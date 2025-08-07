"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { LogOut, Trophy, Settings, Home, Sparkles, Menu, X, User, Camera, Edit3, X as XIcon } from "lucide-react"
import { useImageUpload } from "@/hooks/use-image-upload"

export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()
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

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
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
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center floating-element overflow-hidden">
                {/* Graduation Cap - Exact Design */}
                <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                  {/* Main cap body - darker purple gradient */}
                  <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-purple-700 via-purple-600 to-purple-500 rounded-t-lg"></div>
                  
                  {/* Cap brim */}
                  <div className="absolute top-4 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-purple-500"></div>
                  
                  {/* Tassel hanging from right */}
                  <div className="absolute top-1 right-0 w-1.5 h-5 bg-gradient-to-b from-purple-500 to-purple-400 rounded-full"></div>
                  
                  {/* Book/tablet area below cap */}
                  <div className="absolute top-5 left-1 w-10 h-4 bg-gradient-to-r from-purple-400 to-purple-300 rounded-sm"></div>
                  
                  {/* Large white question mark */}
                  <div className="absolute top-5.5 left-2 w-8 h-3 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">?</span>
                  </div>
                  
                  {/* Two white lines below question mark */}
                  <div className="absolute top-8.5 left-2.5 w-5 h-0.5 bg-white rounded-full"></div>
                  <div className="absolute top-9 left-2.5 w-4 h-0.5 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Text - Exact styling */}
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent leading-tight tracking-wider">
                  HAT REAN
                </span>
                <span className="text-base sm:text-lg font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent leading-tight tracking-wider">
                  QUIZAPP
                </span>
              </div>
            </Link>
          </div>

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
                  </Button>
                </Link>
                {user.isAdmin && (
                  <Link href="/admin">
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
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="rounded-xl border-2 bg-transparent text-sm lg:text-base">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    size="sm"
                    className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-sm lg:text-base"
                  >
                    Sign Up ✨
                  </Button>
                </Link>
              </>
            )}
          </div>

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
