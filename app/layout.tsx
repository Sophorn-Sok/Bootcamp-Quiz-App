import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import Navbar from "@/components/navbar"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

// Using a system font fallback for the playful font to avoid loading issues
const playfulFont = localFont({
  src: [],
  variable: "--font-playful",
  fallback: ["Comic Sans MS", "cursive"],
})

export const metadata: Metadata = {
  title: "QuizMaster - Test Your Knowledge",
  description: "A comprehensive quiz application with multiple categories, leaderboards, and admin features",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfulFont.variable} font-sans`}>
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
