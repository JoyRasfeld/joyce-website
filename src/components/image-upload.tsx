'use client';

import { Loader2, Upload, X, Check, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';

interface ImageState {
  id: string;
  file: File;
  preview: string;
  url: string | null;
  status: 'uploading' | 'uploaded' | 'error';
}

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({
  value,
  onChange,
  maxImages = 5,
}: ImageUploadProps) {
  const [images, setImages] = useState<ImageState[]>([]);

  const uploadFile = useCallback(
    async (imageState: ImageState) => {
      const formData = new FormData();
      formData.append('image', imageState.file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Upload failed');
        }

        const data = await response.json();

        setImages(prev =>
          prev.map(img =>
            img.id === imageState.id
              ? { ...img, url: data.url, status: 'uploaded' as const }
              : img
          )
        );

        onChange([...value, data.url]);
      } catch {
        setImages(prev =>
          prev.map(img =>
            img.id === imageState.id
              ? { ...img, status: 'error' as const }
              : img
          )
        );
      }
    },
    [value, onChange]
  );

  const handleFiles = useCallback(
    (files: FileList) => {
      const remainingSlots =
        maxImages -
        value.length -
        images.filter(i => i.status === 'uploading').length;
      const filesToAdd = Array.from(files).slice(0, remainingSlots);

      for (const file of filesToAdd) {
        const validTypes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
        ];
        if (!validTypes.includes(file.type)) continue;
        if (file.size > 10 * 1024 * 1024) continue;

        const id = Math.random().toString(36).slice(2, 10);
        const reader = new FileReader();

        reader.onloadend = () => {
          const newImage: ImageState = {
            id,
            file,
            preview: reader.result as string,
            url: null,
            status: 'uploading',
          };

          setImages(prev => [...prev, newImage]);
          uploadFile(newImage);
        };

        reader.readAsDataURL(file);
      }
    },
    [maxImages, value.length, images, uploadFile]
  );

  const retryUpload = useCallback(
    (id: string) => {
      const img = images.find(i => i.id === id);
      if (!img) return;

      setImages(prev =>
        prev.map(i =>
          i.id === id ? { ...i, status: 'uploading' as const } : i
        )
      );

      uploadFile(img);
    },
    [images, uploadFile]
  );

  const removeImage = useCallback(
    (id: string) => {
      const img = images.find(i => i.id === id);

      setImages(prev => prev.filter(i => i.id !== id));

      if (img?.url) {
        onChange(value.filter(url => url !== img.url));
      }
    },
    [images, value, onChange]
  );

  const hasUploading = images.some(i => i.status === 'uploading');
  const hasErrors = images.some(i => i.status === 'error');
  const canAddMore =
    value.length + images.filter(i => i.status === 'uploading').length <
    maxImages;

  return (
    <div className="space-y-4">
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map(img => (
            <div key={img.id} className="relative group">
              <div className="aspect-square relative rounded-lg overflow-hidden border">
                <Image
                  src={img.preview}
                  alt="Upload preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  {img.status === 'uploading' && (
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                  )}
                  {img.status === 'uploaded' && (
                    <Check className="h-6 w-6 text-green-400" />
                  )}
                  {img.status === 'error' && (
                    <button
                      type="button"
                      onClick={() => retryUpload(img.id)}
                      className="text-white hover:text-red-300"
                    >
                      <RotateCcw className="h-6 w-6" />
                    </button>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 z-10"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {canAddMore && (
        <label className="block border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors relative">
          <Upload className="mx-auto h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium">Upload reference photos</p>
          <p className="text-xs text-muted-foreground mt-1">
            JPEG, PNG, or WebP up to 10MB ({value.length}/{maxImages} uploaded)
          </p>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={e => e.target.files && handleFiles(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>
      )}

      {hasErrors && (
        <p className="text-sm text-destructive">
          Some images failed to upload. Click the retry icon to try again.
        </p>
      )}

      {hasUploading && (
        <p className="text-sm text-muted-foreground">Uploading images...</p>
      )}
    </div>
  );
}
