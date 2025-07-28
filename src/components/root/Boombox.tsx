"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function Boombox() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="ml-5 hover:-translate-y-2 transition-transform duration-100 cursor-pointer shadow-2xl"
      title={isPlaying ? "Pause it" : "Hit the beat"}
    >
      <Image
        src="/images/boombox.webp"
        alt="Boombox"
        width={190}
        height={116}
        priority
      />
      <audio ref={audioRef} src="/sounds/nintendowii.mp3" loop />
    </button>
  );
}
