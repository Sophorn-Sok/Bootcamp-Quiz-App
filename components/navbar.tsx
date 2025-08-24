"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import {
  LogOut,
  Trophy,
  Settings,
  Home,
  Sparkles,
  Menu,
  X as XIcon,
  User,
  Camera,
  Edit3,
} from "lucide-react"
import { useImageUpload } from "@/hooks/use-image-upload"

export default function Navbar() {
  const { user, logout, updateProfile } = useAuth()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  const {
    imageUrl,
    isUploading,
    fileInputRef,
    handleImageUpload,
    triggerFileInput,
    removeImage,
  } = useImageUpload({ user, updateProfile, initialImageUrl: user?.user_metadata?.avatar_url })

  const fullName = user?.user_metadata?.full_name || user?.email || "User"
  const username = user?.username || user?.user_metadata?.username || fullName.split(" ")[0]
  const initial = useMemo(
    () => (fullName?.trim()?.charAt(0)?.toUpperCase() || "U"),
    [fullName]
  )

  const handleLogout = () => {
    logout()
    // push first, then close UI
    router.push("/auth/login")
    setIsMobileMenuOpen(false)
    setIsProfileDropdownOpen(false)
  }

  const closeOverlays = () => {
    setIsMobileMenuOpen(false)
    setIsProfileDropdownOpen(false)
  }

  const NavLinkButton = ({
    href,
    children,
    className = "",
    variant = "ghost" as React.ComponentProps<typeof Button>["variant"],
    size = "sm" as React.ComponentProps<typeof Button>["size"],
    onClick,
  }: {
    href: string
    children: React.ReactNode
    className?: string
    variant?: React.ComponentProps<typeof Button>["variant"]
    size?: React.ComponentProps<typeof Button>["size"]
    onClick?: () => void
  }) => (
    <Button asChild variant={variant} size={size} className={className} onClick={onClick}>
      <Link href={href}>{children}</Link>
    </Button>
  )

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg shadow-purple-100/50 border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 sm:space-x-4" onClick={closeOverlays}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center floating-element rounded-2xl overflow-hidden">
                <img
                  src="/logo.png"
                  alt="HAT REAN QUIZAPP Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-2xl sm:text-3xl font-black text-purple-600 leading-none tracking-wide">
                  HAT REAN
                </span>
                <span className="text-base sm:text-lg font-bold text-purple-500 leading-none tracking-wide mt-0.5">
                  QUIZAPP
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {user ? (
              <>
                <NavLinkButton
                  href="/"
                  className="rounded-xl hover:bg-purple-50 text-sm lg:text-base"
                >
                  <Home className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Home</span>
                </NavLinkButton>

                <NavLinkButton
                  href="/leaderboard"
                  className="rounded-xl hover:bg-purple-50 text-sm lg:text-base"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Leaderboard</span>
                </NavLinkButton>

                {/* Profile Dropdown */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsProfileDropdownOpen((v) => !v)}
                    className="flex items-center space-x-2 lg:space-x-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl px-3 lg:px-4 py-2 hover:from-purple-200 hover:to-pink-200 transition-all duration-200"
                    aria-expanded={isProfileDropdownOpen}
                    aria-haspopup="menu"
                  >
                    <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center overflow-hidden">
                      {imageUrl ? (
                        <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white font-bold text-xs lg:text-sm">{initial}</span>
                      )}
                    </div>
                    <span className="text-xs lg:text-sm font-medium text-gray-700 hidden lg:inline">
                      Hi, {fullName}! 👋
                    </span>
                    <span className="text-xs font-medium text-gray-700 lg:hidden">Hi! 👋</span>
                  </Button>

                  {/* Profile Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden z-50"
                    >
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
                                <span className="text-white font-bold text-2xl">{initial}</span>
                              )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 flex space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={triggerFileInput}
                                disabled={isUploading}
                                className="w-8 h-8 rounded-full p-0 bg-white border-2 border-purple-200 hover:border-purple-300"
                                aria-label="Upload profile image"
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
                                  aria-label="Remove profile image"
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
                          <h3 className="text-lg font-bold text-gray-800">{fullName}</h3>
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
                          <NavLinkButton
                            href="/profile"
                            variant="ghost"
                            className="w-full justify-start text-left hover:bg-purple-50 rounded-xl"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <User className="w-4 h-4 mr-3 text-purple-600" />
                            View Profile
                          </NavLinkButton>

                          <NavLinkButton
                            href="/profile"
                            variant="ghost"
                            className="w-full justify-start text-left hover:bg-purple-50 rounded-xl"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <Edit3 className="w-4 h-4 mr-3 text-purple-600" />
                            Edit Profile
                          </NavLinkButton>

                          <NavLinkButton
                            href="/achievements"
                            variant="ghost"
                            className="w-full justify-start text-left hover:bg-purple-50 rounded-xl"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <Trophy className="w-4 h-4 mr-3 text-purple-600" />
                            My Achievements
                          </NavLinkButton>
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
                <NavLinkButton
                  href="/auth/login"
                  variant="outline"
                  className="rounded-xl border-2 bg-transparent text-sm lg:text-base"
                >
                  Login
                </NavLinkButton>
                <NavLinkButton
                  href="/auth/signup"
                  className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-sm lg:text-base"
                >
                  Sign Up ✨
                </NavLinkButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="rounded-xl hover:bg-purple-50"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <XIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-purple-100 bg-white/95 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  <NavLinkButton
                    href="/"
                    variant="ghost"
                    className="w-full justify-start rounded-xl hover:bg-purple-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home className="w-4 h-4 mr-3" />
                    Home
                  </NavLinkButton>

                  <NavLinkButton
                    href="/leaderboard"
                    variant="ghost"
                    className="w-full justify-start rounded-xl hover:bg-purple-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Trophy className="w-4 h-4 mr-3" />
                    Leaderboard
                  </NavLinkButton>

                  {/* Mobile Profile Section */}
                  <div className="border-t border-purple-100 pt-3 mt-3">
                    <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl px-4 py-3 mx-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center overflow-hidden">
                        {imageUrl ? (
                          <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white font-bold text-sm">{initial}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">{fullName}</div>
                        <div className="text-xs text-gray-600">@{username}</div>
                      </div>
                    </div>

                    <NavLinkButton
                      href="/profile"
                      variant="ghost"
                      className="w-full justify-start rounded-xl hover:bg-purple-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      View Profile
                    </NavLinkButton>

                    <NavLinkButton
                      href="/profile"
                      variant="ghost"
                      className="w-full justify-start rounded-xl hover:bg-purple-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Edit3 className="w-4 h-4 mr-3" />
                      Edit Profile
                    </NavLinkButton>

                    <NavLinkButton
                      href="/achievements"
                      variant="ghost"
                      className="w-full justify-start rounded-xl hover:bg-purple-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Trophy className="w-4 h-4 mr-3" />
                      My Achievements
                    </NavLinkButton>

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
                  <NavLinkButton
                    href="/auth/login"
                    variant="outline"
                    className="w-full rounded-xl border-2 bg-transparent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </NavLinkButton>

                  <NavLinkButton
                    href="/auth/signup"
                    className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up ✨
                  </NavLinkButton>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for profile dropdown */}
      {isProfileDropdownOpen && (
        <button
          aria-label="Close profile menu"
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileDropdownOpen(false)}
        />
      )}
    </nav>
  )
}
