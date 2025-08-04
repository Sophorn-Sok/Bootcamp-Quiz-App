import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Helper function to check if Supabase is configured
export function isSupabaseConfigured() {
  return !!(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "https://placeholder.supabase.co"
  );
}

// Create a default client with fallback values to prevent crashes
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

// Client-side singleton with better error handling
let supabaseClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  // Return a mock client if not configured to prevent crashes
  if (!isSupabaseConfigured()) {
    return createClient("https://placeholder.supabase.co", "placeholder-key");
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
}

// Safe version that returns null if not configured
export function getSupabaseClientSafe() {
  if (!isSupabaseConfigured()) {
    return null;
  }
  return getSupabaseClient();
}
