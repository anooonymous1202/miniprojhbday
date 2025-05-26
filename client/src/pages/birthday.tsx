import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConfettiAnimation from '@/components/confetti-animation';
import PhotoGallery from '@/components/photo-gallery';
import BirthdayWishes from '@/components/birthday-wishes';

export default function BirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const scrollToGallery = () => {
    document.getElementById('photo-gallery')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const triggerCelebration = () => {
    setShowConfetti(true);
    setIsAnimating(true);
    
    setTimeout(() => {
      setShowConfetti(false);
      setIsAnimating(false);
    }, 5000);
  };

  const floatingEmojis = ['🎈', '🎂', '🎁', '🎉'];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ConfettiAnimation isActive={showConfetti} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden">
        {/* Large 18 in background */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
        >
          <span className="font-playfair text-[30rem] md:text-[40rem] font-bold gradient-text select-none">
            18
          </span>
        </motion.div>

        {/* Floating decoration elements */}
        {floatingEmojis.map((emoji, index) => {
          const positions = [
            { top: '20%', left: '10%' },
            { top: '25%', right: '15%' },
            { bottom: '25%', left: '15%' },
            { bottom: '20%', right: '10%' }
          ];
          
          return (
            <motion.div
              key={index}
              className="absolute text-4xl md:text-6xl z-10"
              style={positions[index]}
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
            >
              {emoji}
            </motion.div>
          );
        })}
        
        {/* Main content */}
        <div className="text-center z-10 px-4 max-w-4xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="font-playfair text-6xl md:text-8xl font-bold gradient-text mb-4"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Happy 18th Birthday!
            </motion.h1>
            <div className="flex justify-center items-center gap-4 text-4xl md:text-6xl mb-6">
              {['🎂', '🎈', '🎉', '🎁'].map((emoji, index) => (
                <motion.span
                  key={index}
                  animate={{ y: [0, -20, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            className="glass-effect rounded-2xl p-8 mb-8 transform hover:scale-105 transition-all duration-300 relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="font-playfair text-2xl md:text-3xl text-gray-700 leading-relaxed mb-4">
              "Another year of wonderful memories, laughter, and joy! May this special day bring you happiness beyond measure and may the year ahead be filled with blessings, adventures, and dreams come true."
            </p>
            <p className="font-montserrat text-lg text-purple-600 font-medium">
              From someone who cares about you ✨
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              onClick={scrollToGallery}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-montserrat font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Images className="h-5 w-5 mr-2" />
              View Your Special Moments
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <PhotoGallery />

      {/* Birthday Wishes */}
      <BirthdayWishes />

      {/* Closing Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold gradient-text mb-6">
              Make This Day Unforgettable
            </h2>
            <p className="font-montserrat text-xl text-gray-600 leading-relaxed mb-8">
              Birthdays are nature's way of telling us to eat more cake, make more wishes, and celebrate the incredible person you are!
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center items-center gap-8 text-5xl mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {['🎂', '🎈', '🎉', '🎁', '🎊'].map((emoji, index) => (
              <motion.span
                key={index}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={triggerCelebration}
              disabled={isAnimating}
              className="bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-600 hover:from-pink-600 hover:via-yellow-500 hover:to-purple-700 text-white px-12 py-4 rounded-full font-montserrat font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 disabled:opacity-70"
            >
              <Sparkles className="h-6 w-6 mr-3" />
              {isAnimating ? 'Celebrating!' : 'Celebrate!'}
              <Sparkles className="h-6 w-6 ml-3" />
            </Button>
          </motion.div>

          <motion.div
            className="mt-12 p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="font-playfair text-2xl text-gray-700 font-semibold">
              "Count your life by smiles, not tears. Count your age by friends, not years."
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
