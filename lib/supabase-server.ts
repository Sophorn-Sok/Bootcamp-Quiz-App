import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Check if environment variables are set
if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Supabase server environment variables are not set.")
}

export const supabaseServer = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseServiceKey || "placeholder-key",
)

export function isSupabaseServerConfigured() {
  return !!(supabaseUrl && supabaseServiceKey && supabaseUrl !== "https://placeholder.supabase.co")
}
