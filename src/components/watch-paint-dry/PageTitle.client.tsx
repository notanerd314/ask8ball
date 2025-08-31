'use client';

import { usePaintDry } from "./PaintDryContext.client";
import { useEffect } from "react";

export default function PageTitle() {
  const { gameState } = usePaintDry();

  useEffect(() => {
    console.log("Updating title");

    if (gameState === "failed") {
      document.title = "❌ You failed!"
    } else if (gameState === "completed") {
      document.title = "✅ You won!"
    }
  }, [gameState]);

  return null;
}