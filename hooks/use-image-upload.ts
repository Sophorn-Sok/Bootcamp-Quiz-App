import { useState, useRef } from 'react'
import { useAuth } from '@/lib/auth-context'

interface UseImageUploadReturn {
  imageUrl: string | null
  isUploading: boolean
  fileInputRef: React.RefObject<HTMLInputElement>
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  triggerFileInput: () => void
  removeImage: () => void
}

export function useImageUpload(): UseImageUploadReturn {
  const { profileImageUrl, setProfileImageUrl } = useAuth()
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB')
      return
    }

    setIsUploading(true)

    // Create a preview URL for the selected image
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setProfileImageUrl(result)
      setIsUploading(false)
      
      // Here you would typically upload to your backend/storage
      // For now, we'll just store the preview URL
      console.log('Image uploaded:', file.name)
    }
    reader.readAsDataURL(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    setProfileImageUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return {
    imageUrl: profileImageUrl,
    isUploading,
    fileInputRef,
    handleImageUpload,
    triggerFileInput,
    removeImage
  }
}
