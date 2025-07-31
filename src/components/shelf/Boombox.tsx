"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function Boombox() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const fadeInAndPlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/nintendowii.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0;
    }

    audioRef.current.play();

    const step = 0.2;
    const interval = setInterval(() => {
      if (!audioRef.current) return;

      if (audioRef.current.volume < 1 - step) {
        audioRef.current.volume += step;
      } else {
        audioRef.current.volume = 1;
        setIsToggling(false);
        clearInterval(interval);
      }
    }, 100);
  };

  /**
   * Gradually reduce the audio volume to 0, then pause the audio.
   * @returns {void}
   */
  const fadeOutAndPause = () => {
    if (!audioRef.current) return;

    const step = 0.2;
    const interval = setInterval(() => {
      if (audioRef.current!.volume > step) {
        audioRef.current!.volume -= step;
      } else {
        audioRef.current!.volume = 0;
        audioRef.current!.pause();
        setIsToggling(false);
        clearInterval(interval);
      }
    }, 100);
  };


  const toggleAudio = () => {
    setIsToggling(true);
    if (isPlaying) {
      fadeOutAndPause();
    } else {
      fadeInAndPlay();
    }

    setIsPlaying((prev) => !prev);
  };

  return (
    <button
      onClick={toggleAudio}
      className="ml-5 cursor-pointer duration-100 hover:-translate-y-2 transition-transform max-w-40"
      title={isPlaying ? "Pause it" : "Hit the beat"}
      disabled={isToggling}
    >
      <img
        src="/images/boombox.webp"
        alt="Boombox"
        className="drop-shadow-2xl"
        loading="lazy"
        style={{
          animation: isPlaying ? "boomboxBounce 1s infinite ease-in-out" : "none",
        }}
      />
    </button>
  );
}
