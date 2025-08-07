"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { mockUsers, type User } from "./mock-data"

interface AuthContextType {
  user: User | null
  profileImageUrl: string | null
  setProfileImageUrl: (url: string | null) => void
  updateProfile: (updates: Partial<User>) => void
  login: (username: string, password: string) => Promise<boolean>
  signup: (username: string, password: string, fullName: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user and profile image on mount
    const storedUser = localStorage.getItem("quiz-app-user")
    const storedImageUrl = localStorage.getItem("quiz-app-profile-image")
    
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    
    if (storedImageUrl) {
      setProfileImageUrl(storedImageUrl)
    }
    
    setIsLoading(false)
  }, [])

  const updateProfileImage = (url: string | null) => {
    setProfileImageUrl(url)
    if (url) {
      localStorage.setItem("quiz-app-profile-image", url)
    } else {
      localStorage.removeItem("quiz-app-profile-image")
    }
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates })
      localStorage.setItem("quiz-app-user", JSON.stringify({ ...user, ...updates }))
    }
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.username === username)
    if (foundUser && password === "password") {
      // Simple password check for demo
      setUser(foundUser)
      localStorage.setItem("quiz-app-user", JSON.stringify(foundUser))
      return true
    }
    return false
  }

  const signup = async (username: string, password: string, fullName: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if username already exists
    const existingUser = mockUsers.find((u) => u.username === username)
    if (existingUser) {
      return false
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      fullName,
      isAdmin: false,
    }

    mockUsers.push(newUser)
    setUser(newUser)
    localStorage.setItem("quiz-app-user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    setProfileImageUrl(null)
    localStorage.removeItem("quiz-app-user")
    localStorage.removeItem("quiz-app-profile-image")
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      profileImageUrl, 
      setProfileImageUrl: updateProfileImage,
      updateProfile,
      login, 
      signup, 
      logout, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
