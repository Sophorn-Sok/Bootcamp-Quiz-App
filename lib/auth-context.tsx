"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { type User } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  profileImageUrl: string | null
  setProfileImageUrl: (url: string | null) => void
  updateProfile: (updates: Partial<User>) => void
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, fullName: string, role: string) => Promise<boolean>
  verifyOtp: (email: string, token: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setIsLoading(false)
    }

    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase.auth])

  const updateProfileImage = (url: string | null) => {
    setProfileImageUrl(url)
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates })
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return !error
  }

  const signup = async (email: string, password: string, fullName: string, role: string): Promise<boolean> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        }
      }
    })
    return !error
  }

  const verifyOtp = async (email: string, token: string): Promise<boolean> => {
    const { error } = await supabase.auth.verifyOtp({ email, token, type: 'signup' });
    return !error;
  };

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfileImageUrl(null)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      profileImageUrl, 
      setProfileImageUrl: updateProfileImage,
      updateProfile,
      login, 
      signup, 
      verifyOtp,
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