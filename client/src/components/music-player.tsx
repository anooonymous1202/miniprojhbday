import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
  duration: string;
}

// Birthday-themed playlist
const playlist: Song[] = [
  {
    id: '1',
    title: 'Happy Birthday',
    artist: 'Traditional',
    src: '/songs/happy-birthday.mp3',
    duration: '0:30'
  },
  {
    id: '2',
    title: 'Celebration',
    artist: 'Kool & The Gang',
    src: '/songs/celebration.mp3',
    duration: '3:45'
  },
  {
    id: '3',
    title: 'Good as Hell',
    artist: 'Lizzo',
    src: '/songs/good-as-hell.mp3',
    duration: '2:39'
  },
  {
    id: '4',
    title: 'Birthday',
    artist: 'Katy Perry',
    src: '/songs/birthday-katy.mp3',
    duration: '3:34'
  }
];

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState([0.7]);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      nextSong();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume[0];
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Handle autoplay restrictions
        console.log('Autoplay prevented - user interaction required');
      });
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setProgress(value[0]);
  };

  return (
    <>
      {/* Floating Music Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
        >
          <Music className="h-6 w-6 text-white" />
        </Button>
      </motion.div>

      {/* Music Player Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white">
              <h3 className="font-playfair text-lg font-semibold">Birthday Playlist 🎵</h3>
              <p className="font-montserrat text-sm opacity-90">Celebrating Haasika</p>
            </div>

            {/* Current Song Info */}
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-montserrat font-semibold text-gray-800 truncate">
                {currentSong.title}
              </h4>
              <p className="font-montserrat text-sm text-gray-600 truncate">
                {currentSong.artist}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="px-4 py-2">
              <Slider
                value={[progress]}
                onValueChange={handleProgressClick}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSong}
                className="hover:bg-pink-100"
              >
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 text-white" />
                ) : (
                  <Play className="h-6 w-6 text-white ml-1" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextSong}
                className="hover:bg-pink-100"
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 px-4 pb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="flex-shrink-0"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={1}
                step={0.1}
                className="flex-1"
              />
            </div>

            {/* Playlist */}
            <div className="max-h-40 overflow-y-auto border-t border-gray-100">
              {playlist.map((song, index) => (
                <button
                  key={song.id}
                  onClick={() => {
                    setCurrentSongIndex(index);
                    setIsPlaying(true);
                  }}
                  className={`w-full p-3 text-left hover:bg-gray-50 transition-colors ${
                    index === currentSongIndex ? 'bg-pink-50 border-r-2 border-pink-500' : ''
                  }`}
                >
                  <div className="font-montserrat text-sm font-medium text-gray-800 truncate">
                    {song.title}
                  </div>
                  <div className="font-montserrat text-xs text-gray-600 truncate">
                    {song.artist} • {song.duration}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </>
  );
}