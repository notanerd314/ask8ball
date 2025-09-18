"use client";

import { useState } from "react";
import useSound from "use-sound";

export default function Clicker() {
  const [count, setCount] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const [play] = useSound("/click.mp3", {
    volume: 0.5,
    interrupt: false,
  });

  const clickAndPlay = () => {
    setCount((prev) => prev + 1);
    play();
  };

  return (
    <button
      onMouseDown={() => {setIsPressed(true); clickAndPlay();}}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className="text-white max-w-40 translate-y-5 transition-transform hover:scale-105"
      title="Click me!"
      aria-label="Click me!"
      role="button"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <img
        src="/button.webp"
        alt="Button"
        className={`drop-shadow-2xl origin-bottom z-0 block pointer-events-none ${isPressed && "hidden"}`}
        loading="lazy"
      />

      <img
        src="/buttonpressed.webp"
        alt="Button"
        className={`drop-shadow-2xl origin-bottom z-0 block pointer-events-none ${!isPressed && "hidden"}`}
        loading="lazy"
      />
    </button>
  );
}
