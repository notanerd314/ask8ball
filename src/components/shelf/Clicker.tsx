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

  const evilClickAndPlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.button === 1) {
      e.preventDefault();
      setCount((prev) => prev - 1);
      play();
    }
  };

  return (
    <button
      onClick={clickAndPlay}
      onAuxClick={evilClickAndPlay}
      className="
        px-4 py-2 text-2xl text-black
        bg-gradient-to-b from-gray-200 to-gray-300 border border-gray-500 rounded-md
        shadow-[inset_-2px_-2px_0px_#ffffff,2px_2px_0px_#a1a1aa]
        active:shadow-[inset_2px_2px_0px_#a1a1aa,inset_-2px_-2px_0px_#ffffff]
        active:from-gray-300 active:to-gray-200
        transition-all duration-100 ease-in-out max-w-55
      "
      title="Click me!"
      aria-label="Click me!"
      role="button"
      style={{
        fontFamily: "Arial, sans-serif",
      }}
    >
      Clicked <strong>{count}</strong> time{count === 1 ? "" : "s"}
    </button>
  );
}
