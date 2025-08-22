 "use client"

import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { toast } from "@/hooks/use-toast"

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { verifyOtp } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const emailFromParams = searchParams.get("email")
    if (emailFromParams) {
      setEmail(emailFromParams)
    }
  }, [searchParams])

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!email) {
      toast({
        title: "Error",
        description: "Email not found. Please go back to signup.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      const success = await verifyOtp(email, otp)
      if (success) {
        toast({
          title: "Success",
          description: "Account verified successfully! You can now log in.",
        })
        router.push("/auth/login")
      } else {
        toast({
          title: "Error",
          description: "Invalid OTP or an error occurred during verification.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred during OTP verification.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4">
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-3xl">
        <CardHeader className="flex flex-col items-center">
          <div className="mb-4">
            <img src="/logo.png" alt="Hat Rean QuizApp Logo" className="w-20 h-20 rounded-2xl shadow-lg mx-auto" />
          </div>
          <CardTitle className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center">
            Verify Your Account
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Please enter the 6-digit code sent to <span className="font-semibold text-purple-600">{email}</span> to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <Label htmlFor="otp" className="text-sm font-semibold text-purple-700">
                Verification Code
              </Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                className="mt-2 bg-white/80 border border-purple-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 rounded-xl"
                placeholder="Enter your 6-digit code"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl py-2 shadow hover:opacity-90 transition"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}