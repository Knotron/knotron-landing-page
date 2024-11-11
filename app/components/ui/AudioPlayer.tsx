"use client";

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.5;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      
      const handleEnded = () => {
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.error("Audio replay failed:", error);
          setIsPlaying(false);
        });
      };

      const handleInterruption = () => {
        if (isPlaying) {
          audio.play().catch(error => {
            console.error("Audio resumption failed:", error);
            setIsPlaying(false);
          });
        }
      };

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('pause', handleInterruption);
      
      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('pause', handleInterruption);
      };
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={togglePlay}
        className="bg-black/80 hover:bg-black text-white p-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 hover:border-white/30"
        aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </button>
      <audio ref={audioRef} loop>
        <source src="/background-music.m4a" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;