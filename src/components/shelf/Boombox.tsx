"use client";

import { getRandomItem } from "@/rng";
import { useRef, useState } from "react";

const songs = [
  "wiishopbling",
  "ohmydayum"
]

export default function Boombox() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const fadeInAndPlay = () => {
    audioRef.current = new Audio(`/sounds/boombox/${getRandomItem(songs)}.mp3`);
    audioRef.current.loop = true;
    audioRef.current.volume = 0;

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
      className="inline-block ml-5 cursor-pointer duration-100 hover:-translate-y-2 transition-transform max-w-45"
      title={isPlaying ? "Stop playing" : "Hit the beat"}
      disabled={isToggling}
    >
      <img
        src="/images/gadgets/boombox.webp"
        alt="Boombox"
        className="drop-shadow-2xl origin-bottom"
        loading="lazy"
        style={{
          animation: isPlaying ? "boomboxBounce 1s infinite ease-in-out" : "none",
        }}
      />
    </button>
  );
}
