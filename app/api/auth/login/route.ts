import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: data.user.id,
        email: data.user.email,
        username: data.user.user_metadata?.username,
        fullName: data.user.user_metadata?.full_name,
      },
    })

    if (data.session) {
      response.cookies.set("sb-access-token", data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: data.session.expires_in,
      })

      response.cookies.set("sb-refresh-token", data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 })
  }
}
