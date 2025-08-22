"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { useImageUpload } from "@/hooks/use-image-upload"
import { Camera, Edit3, User, Trophy, Clock, BookOpen, Target } from "lucide-react"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
    bio: "Passionate learner and quiz enthusiast! 🎓",
    location: "Student"
  })

  const {
    imageUrl,
    isUploading,
    fileInputRef,
    handleImageUpload,
    triggerFileInput,
    removeImage
  } = useImageUpload()

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        username: user.username,
        bio: "Passionate learner and quiz enthusiast! 🎓",
        location: "Student"
      })
    }
  }, [user])

  if (!user) {
    router.push("/auth/login")
    return null
  }

  const handleSave = () => {
    // Update the user profile with new data
    updateProfile({
      fullName: formData.fullName,
      username: formData.username
    })
    
    // Here you would typically also save bio and location to your backend
    console.log("Saving profile:", formData)
    setIsEditing(false)
    
    // Show success message
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName,
      username: user.username,
      bio: "Passionate learner and quiz enthusiast! 🎓",
      location: "Student"
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">Manage your account and track your progress</p>
          
          {/* Success Message */}
          {showSuccess && (
            <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-xl text-green-700 text-sm">
              ✅ Profile updated successfully!
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardHeader className="text-center pb-4">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                                            <span className="text-white font-bold text-3xl">{user.fullName.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={triggerFileInput}
                      disabled={isUploading}
                      className="w-8 h-8 rounded-full p-0 bg-white border-2 border-purple-200 hover:border-purple-300"
                    >
                      {isUploading ? (
                        <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4 text-purple-600" />
                      )}
                    </Button>
                    {imageUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={removeImage}
                        className="w-8 h-8 rounded-full p-0 bg-white border-2 border-red-200 hover:border-red-300"
                      >
                        <span className="text-red-600 text-xs">×</span>
                      </Button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">{user.fullName}</CardTitle>
                <p className="text-gray-600">@{user.username}</p>
                {user.isAdmin && (
                  <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                    Admin
                  </span>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">0</div>
                    <div className="text-sm text-gray-600">Quizzes Taken</div>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-xl">
                    <div className="text-2xl font-bold text-pink-600">0%</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">0h</div>
                    <div className="text-sm text-gray-600">Total Time</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-sm text-gray-600">Categories Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Edit Profile */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Edit3 className="w-5 h-5 mr-2 text-purple-600" />
                  Edit Profile
                </CardTitle>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} size="sm">Save</Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">Cancel</Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    disabled={!isEditing}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-purple-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-purple-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">Completed Math Quiz</div>
                      <div className="text-sm text-gray-600">Score: 85% • 2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-pink-50 rounded-xl">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                      <Trophy className="w-5 h-5 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">Earned "Math Master" Badge</div>
                      <div className="text-sm text-gray-600">1 day ago</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">Set New Goal: Complete 10 Quizzes</div>
                      <div className="text-sm text-gray-600">3 days ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
