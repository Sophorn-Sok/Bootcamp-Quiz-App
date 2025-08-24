import { useState, useRef, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

interface UseImageUploadReturn {
  imageUrl: string | null;
  isUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  triggerFileInput: () => void;
  removeImage: () => void;
}

interface UseImageUploadProps {
  user: User | null;
  updateProfile: (updates: any) => void; // Allow flexible updates
  initialImageUrl?: string | null;
}

export function useImageUpload(props: UseImageUploadProps): UseImageUploadReturn {
  const { user, updateProfile, initialImageUrl } = props;
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(initialImageUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImageUrl) {
      setProfileImageUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  if (!user) {
    // Return a stable, non-functional version of the hook if there's no user
    return {
      imageUrl: null,
      isUploading: false,
      fileInputRef: { current: null },
      handleImageUpload: () => {},
      triggerFileInput: () => {},
      removeImage: () => {},
    };
  }

  const supabase = createClient();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    const filePath = fileName;

    try {
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (publicUrlData?.publicUrl) {
        setProfileImageUrl(publicUrlData.publicUrl);
        // Also store the filePath for easier removal
        updateProfile({
          user_metadata: {
            ...user.user_metadata,
            avatar_url: publicUrlData.publicUrl,
            avatar_path: filePath, // Store the path
          },
        });
      }
    } catch (error: any) {
      console.error('Error uploading image:', error.message);
      alert('Error uploading image: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = async () => {
    if (!user) return;

    // Get the file path from user metadata
    const filePath = user.user_metadata?.avatar_path;

    if (!filePath) {
      // If for some reason the path isn't stored, fall back to clearing the URL
      console.warn("No avatar_path found in user metadata. Clearing URL only.");
      setProfileImageUrl(null);
      updateProfile({
        user_metadata: {
          ...user.user_metadata,
          avatar_url: null,
          avatar_path: null,
        },
      });
      return;
    }


    setIsUploading(true);
    try {
      const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove([filePath]);

      if (deleteError) {
        // Don't block UI update if file doesn't exist in storage
        if (deleteError.message !== 'The resource was not found') {
          throw deleteError;
        }
        console.warn(`File not found in storage, but proceeding to clear from profile: ${filePath}`);
      }

      setProfileImageUrl(null);
      updateProfile({
        user_metadata: {
          ...user.user_metadata,
          avatar_url: null,
          avatar_path: null, // Clear the path
        },
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Error removing image:', error.message);
      alert('Error removing image: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    imageUrl: profileImageUrl,
    isUploading,
    fileInputRef,
    handleImageUpload,
    triggerFileInput,
    removeImage,
  };
}
