import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateConfettiPiece() {
  const colors = ['#FF69B4', '#FFD700', '#9370DB', '#FF1493', '#DA70D6'];
  return {
    id: Math.random().toString(36).substr(2, 9),
    color: colors[Math.floor(Math.random() * colors.length)],
    left: Math.random() * 100,
    animationDelay: Math.random() * 3,
    animationDuration: Math.random() * 2 + 2,
  };
}
