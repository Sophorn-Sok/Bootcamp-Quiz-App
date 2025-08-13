import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    let emailToUse = username

    if (!username.includes("@")) {
      // Query the auth.users table to find user by username in raw_user_meta_data
      const { data: userData, error: userError } = await supabase
        .from("auth.users")
        .select("email")
        .eq("raw_user_meta_data->>username", username)
        .single()

      if (userError || !userData) {
        // Try alternative approach - query profiles table if it exists
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("email")
          .eq("username", username)
          .single()

        if (profileError || !profileData) {
          return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        emailToUse = profileData.email
      } else {
        emailToUse = userData.email
      }
    }

    const signInResult = await supabase.auth.signInWithPassword({
      email: emailToUse,
      password,
    })

    if (signInResult.error) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({
      message: "Login successful",
      user: signInResult.data.user,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 })
  }
}
