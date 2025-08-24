// hooks/use-image-upload.ts
"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface UseImageUploadProps {
  user: User | null;
  updateProfile: (updates: any) => Promise<any> | any;
  initialImageUrl?: string | null;
}

interface UseImageUploadReturn {
  imageUrl: string | null;
  isUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  triggerFileInput: () => void;
  removeImage: () => void;
  getTransformedUrl: (options: { width: number; height: number }) => string | null;
}

const BUCKET = "avatars"; // must match your Supabase bucket name exactly

export function useImageUpload({
  user,
  updateProfile,
  initialImageUrl,
}: UseImageUploadProps): UseImageUploadReturn {
  const supabase = createClient();
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImageUrl(initialImageUrl ?? null);
  }, [initialImageUrl]);

  const getTransformedUrl = (options: { width: number; height: number }): string | null => {
    if (!imageUrl) return null;
    const path = user?.user_metadata?.avatar_path;
    if (!path) return imageUrl; // return original if no path

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path, {
      transform: {
        width: options.width,
        height: options.height,
        resize: "cover", // or "contain" or "fill"
      },
    });
    return data?.publicUrl ?? imageUrl;
  };

  // No-op version if there's no user (avoids null checks in components)
  if (!user) {
    return {
      imageUrl: null,
      isUploading: false,
      fileInputRef: { current: null },
      handleImageUpload: () => {},
      triggerFileInput: () => {},
      removeImage: () => {},
      getTransformedUrl: () => null,
    };
  }

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    setIsUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const filePath = `${user.id}/${Date.now()}.${ext}`; // no leading "/"

      // Upload to the 'avatars' bucket
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        console.error("[uploadError]", uploadError);
        throw new Error(uploadError.message || "Upload failed");
      }

      // Resolve public URL (bucket should be Public)
      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
      const publicUrl = pub?.publicUrl;
      if (!publicUrl) throw new Error("Could not resolve public URL for uploaded image.");

      setImageUrl(publicUrl);

      // Persist to user metadata, keep path for deletion
      await Promise.resolve(
        updateProfile({
          user_metadata: {
            ...user.user_metadata,
            avatar_url: publicUrl,
            avatar_path: filePath,
          },
        })
      );

      // Clear input so re-selecting the same file triggers change
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      console.error("Error uploading image:", err?.message || err);
      alert(`Error uploading image: ${err?.message || "Unknown error"}`);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = async () => {
    setIsUploading(true);
    try {
      const filePath = user.user_metadata?.avatar_path as string | undefined;

      if (filePath) {
        const { error: deleteError } = await supabase.storage.from(BUCKET).remove([filePath]);
        if (deleteError && deleteError.message !== "The resource was not found") {
          console.error("[deleteError]", deleteError);
          throw new Error(deleteError.message);
        }
      } else {
        console.warn("No avatar_path in metadata; clearing URL only.");
      }

      setImageUrl(null);

      await Promise.resolve(
        updateProfile({
          user_metadata: {
            ...user.user_metadata,
            avatar_url: null,
            avatar_path: null,
          },
        })
      );

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      console.error("Error removing image:", err?.message || err);
      alert(`Error removing image: ${err?.message || "Unknown error"}`);
    } finally {
      setIsUploading(false);
    }
  };

  return { imageUrl, isUploading, fileInputRef, handleImageUpload, triggerFileInput, removeImage, getTransformedUrl };
}
