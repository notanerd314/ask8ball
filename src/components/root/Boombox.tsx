"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function Boombox() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/nintendowii.mp3");
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleAudio}
      className="ml-5 duration-100 cursor-pointer shadow-2xl hover:-translate-y-2 transition-transform"
      style={{
        animation: isPlaying ? "boomboxBounce 1s infinite ease-in-out" : "none",
      }}
      title={isPlaying ? "Pause it" : "Hit the beat"}
    >
      <Image
        src="/images/boombox.webp"
        alt="Boombox"
        width={190}
        height={116}
        priority
      />
    </button>
  );
}
