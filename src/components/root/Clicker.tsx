"use client"

import { useState } from "react";

export default function Clicker() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="
        px-4 py-2 text-2xl text-black
        bg-gray-300 border border-gray-500 rounded-md
        shadow-[inset_-2px_-2px_0px_#ffffff,2px_2px_0px_#a1a1aa]
        active:shadow-[inset_2px_2px_0px_#a1a1aa,inset_-2px_-2px_0px_#ffffff]
        transition-all duration-100 ease-in-out
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
