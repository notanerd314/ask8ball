"use client"

import { useState } from "react";
import useSound from "use-sound";

export default function Clicker() {
  const [count, setCount] = useState(0);
  const [play] = useSound("/sounds/click.mp3", {
    volume: 0.5, // optional, adjust as needed
    interrupt: false, // allow overlaps
  });

  const clickAndPlay = () => {
    setCount((prev) => prev + 1);
    play();
  };

  return (
    <button
      onClick={clickAndPlay}
      className="
        text-white max-w-40 translate-y-10 transition-transform hover:scale-105 active:scale-95
      "
      title="Click me!"
      aria-label="Click me!"
      role="button"
      style={{
        fontFamily: "Arial, sans-serif",
      }}
    >
      <img
        src="/images/gadgets/button.png"
        alt="Button"
        className="drop-shadow-2xl origin-bottom z-0"
        loading="lazy"
      />

      <p className="font-bold -translate-y-30 text-4xl scale-y-65 z-10 text-center">
        {count}
      </p>
    </button>
  );
}
