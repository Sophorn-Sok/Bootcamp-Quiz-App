"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Database, Key } from "lucide-react"

export default function SupabaseSetup() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Supabase Configuration Required</CardTitle>
          <CardDescription>
            To use this quiz application, you need to set up Supabase and configure your environment variables.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Quick Setup Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Click the "Add Supabase Integration" button in the v0 interface</li>
              <li>This will automatically set up your Supabase project and environment variables</li>
              <li>Run the database scripts to create tables and seed data</li>
              <li>Refresh this page to start using the quiz app</li>
            </ol>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Manual Setup (Alternative)
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-medium mb-1">1. Create a Supabase Project</div>
                <p className="text-gray-600">Visit supabase.com and create a new project</p>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <div className="font-medium mb-1">2. Get Your Project Credentials</div>
                <p className="text-gray-600">Copy your project URL and anon key from Settings → API</p>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <div className="font-medium mb-1">3. Set Environment Variables</div>
                <div className="font-mono text-xs bg-gray-800 text-green-400 p-2 rounded mt-2">
                  NEXT_PUBLIC_SUPABASE_URL=your_project_url
                  <br />
                  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={() => window.location.reload()} className="flex items-center">
              <Key className="w-4 h-4 mr-2" />
              Check Configuration Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
