'use client';
import { useEffect, useState } from "react";
import { usePaintDry } from "./PaintDryContext.client";

export default function TTS() {
  const { gameState } = usePaintDry();
  const [ttsSpeech, setTtsSpeech] = useState("");

  useEffect(() => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(ttsSpeech);
    utterance.onend = () => {
      window.speechSynthesis.cancel();
      setTtsSpeech("");
    };
    window.speechSynthesis.speak(utterance);
  }, [ttsSpeech]);

  useEffect(() => {
    if (gameState === "notstarted") return;

    setTtsSpeech(`Just give up.`);
  }, [gameState]);

  return (
    <p className="text-3xl text-white z-50 bg-black/50 text-center rounded-2xl p-3 font-bold absolute bottom-6 left-1/2 -translate-x-1/2" hidden={gameState === "notstarted" || ttsSpeech === ""}>
      {ttsSpeech}
    </p>
  );
}
