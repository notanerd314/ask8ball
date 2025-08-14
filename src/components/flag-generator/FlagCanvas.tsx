"use client";

import { useRef } from "react";

export default function FlagCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ aspectRatio: "2/1", border: "2px solid black" }}
    ></canvas>
  )
}