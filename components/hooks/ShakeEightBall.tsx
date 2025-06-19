import { useState } from "react";
import { useEightBall } from "../context/EightBallContext";
import { useSound } from "use-sound";

import { toast } from "react-toastify";

import { shakeSounds, errorSound } from "../../lib/sounds";
import { getRandomItem } from "../../lib/rng";

const getAnswer = async (question: string) => {
  const res = await fetch("/api/ask-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  const data = await res.json();
  console.log(data);
  return data;
};

export default function useEightBallShake() {
  const {
    answer,
    setAnswer,
    ballCurrentState,
    setBallCurrentState,
    question,
    setDiceStyle
  } = useEightBall();

  const [playShakeSound1] = useSound(shakeSounds[0]);
  const [playShakeSound2] = useSound(shakeSounds[1]);
  const [playErrorSound] = useSound(errorSound);

  const shakeEightBall = async () => {
    if (question.length > 30) {
      playErrorSound();
      toast("Your question is too long.", { type: "error" });
      return;
    }

    setDiceStyle({ opacity: "0", transition: "none" });
    setBallCurrentState("shaking");

    const answerData = await getAnswer(question);

    setAnswer(answerData.response);

    getRandomItem([playShakeSound1, playShakeSound2])();

    setTimeout(() => {
      setBallCurrentState("result");
      setTimeout(() => {
        setDiceStyle({
          transition: "opacity 0.75s ease",
          opacity: "1",
        });
        console.log("Shown result");
      }, 500);
    }, 2200);
  };

  return {
    shakeEightBall
  };
}