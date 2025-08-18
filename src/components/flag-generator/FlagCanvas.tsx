"use client";

import { useRef, useEffect } from "react";

function drawFlag(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
}

export default function FlagCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    drawFlag(ctx, canvas);
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ border: "2px solid black" }}
      width={1200}
      height={800}
    >
    </canvas>
  )
}