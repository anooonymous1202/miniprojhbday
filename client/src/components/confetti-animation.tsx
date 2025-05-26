import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateConfettiPiece } from '@/lib/utils';

interface ConfettiPiece {
  id: string;
  color: string;
  left: number;
  animationDelay: number;
  animationDuration: number;
}

export default function ConfettiAnimation({ isActive }: { isActive: boolean }) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const pieces: ConfettiPiece[] = [];
      for (let i = 0; i < 50; i++) {
        pieces.push(generateConfettiPiece());
      }
      setConfetti(pieces);

      const timeout = setTimeout(() => {
        setConfetti([]);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-2 h-2 rounded-sm"
            style={{
              backgroundColor: piece.color,
              left: `${piece.left}%`,
            }}
            initial={{ y: -100, opacity: 1, rotate: 0 }}
            animate={{ 
              y: window.innerHeight + 100, 
              opacity: 0, 
              rotate: 720 
            }}
            transition={{
              duration: piece.animationDuration,
              delay: piece.animationDelay,
              ease: "linear",
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
