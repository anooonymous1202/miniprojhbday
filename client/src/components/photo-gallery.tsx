import { useState } from 'react';
import { motion } from 'framer-motion';
import { Expand, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PhotoModal from './photo-modal';
import photo1 from "@assets/1.jpg";
import photo2 from "@assets/2.jpg";
import photo3 from "@assets/3.jpg";
import photo4 from "@assets/4.jpg";
import photo5 from "@assets/5.jpg";
import photo6 from "@assets/imagy-image copy.jpg";
import photo7 from "@assets/imagy-image.jpg";

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

const photos: Photo[] = [
  {
    src: photo1,
    alt: 'Beautiful moment at a historic temple with intricate carvings',
    caption: 'Exploring heritage and culture - such a peaceful moment'
  },
  {
    src: photo2,
    alt: 'Bright smile surrounded by lush greenery and palm trees',
    caption: 'Natural beauty in a tropical paradise'
  },
  {
    src: photo3,
    alt: 'Joyful pose in a beautiful floral dress in the park',
    caption: 'Dancing through life with style and grace'
  },
  {
    src: photo4,
    alt: 'Happy celebration with friends and warm smiles',
    caption: 'Cherished moments with the people who matter most'
  },
  {
    src: photo5,
    alt: 'Elegant evening look with stunning traditional jewelry',
    caption: 'Radiating elegance and timeless beauty'
  },
  {
    src: photo6,
    alt: 'Graceful in traditional attire with beautiful floral patterns',
    caption: 'Embracing tradition with modern charm'
  },
  {
    src: photo7,
    alt: 'Sweet moment with a furry friend in festive red',
    caption: 'Love and joy shared with a beloved companion'
  }
];

export default function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedPhotoIndex(index);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  };

  const previousPhoto = () => {
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const featuredPhoto = photos[0];

  return (
    <section id="photo-gallery" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Celebrating <span className="gradient-text">You</span>
          </motion.h2>
          <motion.p
            className="font-montserrat text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >Beautiful you! </motion.p>
        </div>

        {/* Featured photo */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl photo-hover cursor-pointer group"
            onClick={() => openModal(0)}
          >
            <img
              src={featuredPhoto.src}
              alt={featuredPhoto.alt}
              className="w-full h-96 md:h-[500px] object-contain bg-gradient-to-br from-pink-50 to-purple-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="font-playfair text-2xl font-semibold mb-2">Beautiful Memories</h3>
              <p className="font-montserrat text-sm opacity-90">Exploring heritage and culture - such a peaceful moment</p>
            </div>
            <div className="absolute top-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Expand className="h-6 w-6" />
            </div>
          </div>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {photos.slice(1).map((photo, index) => (
            <motion.div
              key={index + 1}
              className="photo-hover cursor-pointer rounded-2xl overflow-hidden shadow-lg group"
              onClick={() => openModal(index + 1)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-64 object-contain bg-gradient-to-br from-pink-50 to-purple-50"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Expand className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Slideshow controls */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Button
            onClick={previousPhoto}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-3 rounded-full font-montserrat font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={nextPhoto}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-montserrat font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </motion.div>
      </div>
      <PhotoModal
        photos={photos}
        currentIndex={currentImageIndex}
        isOpen={selectedPhotoIndex !== null}
        onClose={closeModal}
        onNext={nextPhoto}
        onPrevious={previousPhoto}
      />
    </section>
  );
}
