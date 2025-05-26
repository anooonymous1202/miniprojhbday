import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

interface ImageUploadProps {
  onPhotosChange: (photos: Photo[]) => void;
  currentPhotos: Photo[];
}

export default function ImageUpload({ onPhotosChange, currentPhotos }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newPhotos: Photo[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          newPhotos.push({
            src: result,
            alt: `Uploaded image: ${file.name}`,
            caption: file.name.replace(/\.[^/.]+$/, "") // Remove file extension
          });
          
          if (newPhotos.length === files.length) {
            onPhotosChange([...currentPhotos, ...newPhotos]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = currentPhotos.filter((_, i) => i !== index);
    onPhotosChange(updatedPhotos);
  };

  const updateCaption = (index: number, newCaption: string) => {
    const updatedPhotos = currentPhotos.map((photo, i) => 
      i === index ? { ...photo, caption: newCaption } : photo
    );
    onPhotosChange(updatedPhotos);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          isDragging 
            ? 'border-pink-400 bg-pink-50' 
            : 'border-gray-300 hover:border-pink-300 hover:bg-pink-25'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="font-playfair text-xl font-semibold text-gray-700 mb-2">
          Upload Your Photos
        </h3>
        <p className="font-montserrat text-gray-500 mb-4">
          Drag and drop images here, or click to select files
        </p>
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Choose Images
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>

      {/* Photo Preview Grid */}
      {currentPhotos.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-playfair text-lg font-semibold text-gray-700">
            Your Photos ({currentPhotos.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentPhotos.map((photo, index) => (
              <motion.div
                key={index}
                className="relative group rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-32 object-cover"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) => updateCaption(index, e.target.value)}
                    className="w-full bg-transparent text-xs outline-none placeholder-gray-300"
                    placeholder="Add caption..."
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}