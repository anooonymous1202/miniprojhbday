import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import musicFile from "@assets/Love Story (Instrumental).mp3";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties
    audio.loop = true;
    audio.volume = 0.3; // Set to 30% volume for background music

    // Try to autoplay when component mounts
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        // Autoplay blocked, user needs to interact first
        console.log('Autoplay blocked - user interaction required');
      }
    };

    playAudio();

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = 0.3;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src={musicFile} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Control Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-pink-200">
          <div className="flex items-center gap-2">
            <motion.button
              onClick={togglePlay}
              className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? (
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className="w-1 h-3 bg-white rounded-sm mr-1"></div>
                  <div className="w-1 h-3 bg-white rounded-sm"></div>
                </div>
              ) : (
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                </div>
              )}
            </motion.button>

            <motion.button
              onClick={toggleMute}
              className="p-2 rounded-full text-gray-600 hover:text-pink-600 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </motion.button>
          </div>

          {isPlaying && (
            <motion.div
              className="mt-2 text-xs text-gray-600 text-center font-montserrat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ♪ Love Story ♪
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Music notification on first load */}
      {!isPlaying && (
        <motion.div
          className="fixed top-6 right-6 z-40 bg-pink-100 border border-pink-300 rounded-xl p-4 max-w-sm"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ delay: 4 }}
        >
          <div className="flex items-center gap-3">
            <div className="text-pink-600">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-montserrat text-sm font-medium text-pink-800">
                🎵 Click the music button to add some magic!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}