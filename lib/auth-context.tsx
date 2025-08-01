"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { mockUsers, type User } from "./mock-data"

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  signup: (username: string, password: string, fullName: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("quiz-app-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

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
    localStorage.removeItem("quiz-app-user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
